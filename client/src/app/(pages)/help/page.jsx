"use client";
import React, { useEffect, useRef, useState } from "react";
import faqconfig from "@/app/config/FAQConfig";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { getHelpRecordsByType, updateViews, updateLikes, searchHelpRecords } from "@/app/services/HelpCenterService";
import { dynamicUpdateConfig } from "@/app/utils/FormatConfig";

const Page = () => {
  const [config, setConfig] = useState(faqconfig);
  const observerRef = useRef(null);
  const viewedItemsRef = useRef(new Set());
  const userInteractionsRef = useRef(new Map());
  const clickTimersRef = useRef(new Map());
  const searchTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);
  
  const { title, subtitle, tabs } = config;
  const [value, setValue] = React.useState("0");
  const [tabItemsLoaded, setTabItemsLoaded] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabItemsLoaded(false);
    setShowSearchResults(false);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const records = await getHelpRecordsByType(faqconfig.tabs[value].name);
        dynamicUpdateConfig(faqconfig,{
          fieldName: "items",
          matchKey: "name",
          matchValue: faqconfig.tabs[value].name,
          newData: records.data
        });
        setConfig({ ...faqconfig });
        
        setTimeout(() => {
          setTabItemsLoaded(true);
        }, 100);
      } catch (error) {
        console.error("Error fetching records:", error);
        setTabItemsLoaded(true);
      }
    };
    fetchRecords();
  }, [value]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (!query.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchHelpRecords(query);
        setSearchResults(results.data || []);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchResultClick = (result) => {
    const tabIndex = tabs.findIndex(tab => 
      tab.items.some(item => item.id === result.id)
    );
    
    if (tabIndex !== -1) {
      setValue(tabIndex.toString());
      
      setShowSearchResults(false);
      setSearchQuery("");
      
      setTimeout(() => {
        const element = document.querySelector(`[data-item-id="${result.id}"]`);
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
          });
          
          element.style.transition = "all 0.3s ease";
          element.style.boxShadow = "0 0 0 3px rgba(33, 150, 243, 0.3)";
          element.style.backgroundColor = "#f0f8ff";
          
          setTimeout(() => {
            element.style.boxShadow = "";
            element.style.backgroundColor = "";
          }, 2000);
        }
      }, 300);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
    setSearchResults([]);
  };

  useEffect(() => {
    if (!tabItemsLoaded) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const currentTabItems = config.tabs[value]?.items || [];
    if (!currentTabItems.length) return;

    observerRef.current = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            const tabValue = entry.target.getAttribute("data-tab");
            const itemId = `${tabValue}-${idx}`;

            if (!viewedItemsRef.current.has(itemId)) {
              viewedItemsRef.current.add(itemId);
              
              const item = config.tabs[tabValue]?.items?.[idx];
              if (item && !item.viewed) {
                try {
                  await updateViews(item.id);
                  setConfig((prevConfig) => {
                    const updatedConfig = { ...prevConfig };
                    if (updatedConfig.tabs[tabValue]?.items?.[idx]) {
                      updatedConfig.tabs[tabValue].items[idx] = {
                        ...updatedConfig.tabs[tabValue].items[idx],
                        views: (updatedConfig.tabs[tabValue].items[idx].views || 0) + 1,
                        viewed: true
                      };
                    }
                    return updatedConfig;
                  });
                } catch (err) {
                  console.error("Failed to update view count:", err);
                  viewedItemsRef.current.delete(itemId);
                }
              }
            }
          }
        }
      },
      { 
        threshold: 0.5,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    setTimeout(() => {
      const currentItems = document.querySelectorAll(`[data-tab="${value}"]`);
      currentItems.forEach((el) => {
        observerRef.current.observe(el);
      });

      checkInitiallyVisibleItems();
    }, 200);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [tabItemsLoaded, value, config.tabs]);

  const checkInitiallyVisibleItems = async () => {
    const currentItems = document.querySelectorAll(`[data-tab="${value}"]`);
    const visibleItems = [];

    currentItems.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );

      if (isVisible) {
        visibleItems.push({ element: el, index });
      }
    });

    for (const { element, index } of visibleItems) {
      const itemId = `${value}-${index}`;
      
      if (!viewedItemsRef.current.has(itemId)) {
        viewedItemsRef.current.add(itemId);
        
        const item = config.tabs[value]?.items?.[index];
        if (item && !item.viewed) {
          try {
            await updateViews(item.id);
            
            setConfig((prevConfig) => {
              const updatedConfig = { ...prevConfig };
              if (updatedConfig.tabs[value]?.items?.[index]) {
                updatedConfig.tabs[value].items[index] = {
                  ...updatedConfig.tabs[value].items[index],
                  views: (updatedConfig.tabs[value].items[index].views || 0) + 1,
                  viewed: true
                };
              }
              return updatedConfig;
            });

            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (err) {
            console.error("Failed to update initial view count:", err);
            viewedItemsRef.current.delete(itemId);
          }
        }
      }
    }
  };

  const handleReactionClick = (itemId, tabIndex, itemIndex, reactionType) => {
    const interactionKey = `${tabIndex}-${itemIndex}-${reactionType}`;
    const now = Date.now();
    const lastClick = clickTimersRef.current.get(interactionKey) || 0;
    
    if (now - lastClick < 500) return;
    
    clickTimersRef.current.set(interactionKey, now);
    
    if (userInteractionsRef.current.get(`${interactionKey}-processing`)) return;
    
    userInteractionsRef.current.set(`${interactionKey}-processing`, true);
    
    handleReaction(itemId, tabIndex, itemIndex, reactionType)
      .finally(() => {
        setTimeout(() => {
          userInteractionsRef.current.delete(`${interactionKey}-processing`);
        }, 1000);
      });
  };

  const handleReaction = async (itemId, tabIndex, itemIndex, reactionType) => {
    const interactionKey = `${tabIndex}-${itemIndex}`;
    const currentInteraction = userInteractionsRef.current.get(interactionKey);
    
    try {
      let newLikes = config.tabs[tabIndex]?.items?.[itemIndex]?.likes || 0;
      let newDislikes = config.tabs[tabIndex]?.items?.[itemIndex]?.dislikes || 0;
      let newInteraction = reactionType;

      if (currentInteraction === reactionType) {
        if (reactionType === 'like') {
          newLikes = Math.max(0, newLikes - 1);
        } else {
          newDislikes = Math.max(0, newDislikes - 1);
        }
        newInteraction = null;
      } else if (currentInteraction === 'like' && reactionType === 'dislike') {
        newLikes = Math.max(0, newLikes - 1);
        newDislikes = newDislikes + 1;
      } else if (currentInteraction === 'dislike' && reactionType === 'like') {
        newDislikes = Math.max(0, newDislikes - 1);
        newLikes = newLikes + 1;
      } else if (!currentInteraction) {
        if (reactionType === 'like') {
          newLikes = newLikes + 1;
        } else {
          newDislikes = newDislikes + 1;
        }
      }

      setConfig((prevConfig) => {
        const updatedConfig = { ...prevConfig };
        const item = updatedConfig.tabs[tabIndex]?.items?.[itemIndex];
        
        if (item) {
          updatedConfig.tabs[tabIndex].items[itemIndex] = {
            ...item,
            likes: newLikes,
            dislikes: newDislikes
          };
        }

        if (newInteraction) {
          userInteractionsRef.current.set(interactionKey, newInteraction);
        } else {
          userInteractionsRef.current.delete(interactionKey);
        }

        return updatedConfig;
      });

      await updateLikes(itemId, reactionType, currentInteraction);
      
    } catch (error) {
      console.error(`Failed to update ${reactionType}:`, error);
      
      setConfig((prevConfig) => {
        const updatedConfig = { ...prevConfig };
        const item = updatedConfig.tabs[tabIndex]?.items?.[itemIndex];
        
        if (item) {
          const originalItem = config.tabs[tabIndex]?.items?.[itemIndex];
          if (originalItem) {
            updatedConfig.tabs[tabIndex].items[itemIndex] = {
              ...item,
              likes: originalItem.likes || 0,
              dislikes: originalItem.dislikes || 0
            };
          }
          
          userInteractionsRef.current.set(interactionKey, currentInteraction);
        }

        return updatedConfig;
      });
    }
  };

  const getButtonStyle = (tabIndex, itemIndex, buttonType) => {
    const interactionKey = `${tabIndex}-${itemIndex}`;
    const currentInteraction = userInteractionsRef.current.get(interactionKey);
    
    const baseStyle = "flex items-center gap-1 px-3 py-1 border rounded-md cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ";
    
    if (currentInteraction === buttonType) {
      return baseStyle + (buttonType === 'like' 
        ? "bg-blue-200 border-blue-600 text-blue-800 shadow-sm" 
        : "bg-red-200 border-red-600 text-red-800 shadow-sm");
    }
    
    return baseStyle + "border-gray-300 text-gray-600 hover:bg-gray-50";
  };

  useEffect(() => {
    setTimeout(() => {
      setTabItemsLoaded(true);
    }, 300);
  }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <div className="text-center mb-6 mt-5">
        <h1 className="text-5xl font-extrabold">{title}</h1>
        <p className="mt-3 text-gray-500">{subtitle}</p>
        <div className="flex justify-center mb-8 mt-5">
          <div className="relative w-[25%]" ref={searchInputRef}>
            <SearchRoundedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for answers"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#2196F3] shadow-sm"
              style={{ borderColor: "#E5E7EB" }}
            />
            
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <CloseRoundedIcon fontSize="small" />
              </button>
            )}
            
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-medium text-gray-600">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {searchResults.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleSearchResultClick(result)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-gray-900 text-sm">{result.title}</div>
                        <div className="text-gray-500 text-xs mt-1 line-clamp-2">{result.description}</div>
                        <div className="flex items-center mt-2 text-xs text-gray-400">
                          <VisibilityIcon fontSize="small" />
                          <span className="ml-1">{result.views || 0} views</span>
                          <span className="mx-2">•</span>
                          <span>{result.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <TabContext value={value}>
        <Box
          sx={{
            width: "68%",
            margin: "auto",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="faq tabs">
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                label={tab.name}
                value={idx.toString()}
                sx={{ textTransform: "none" }}
              />
            ))}
          </TabList>
        </Box>
        
        <div className="ml-[28%] mt-10">
          <h1 className="text-xl font-bold">Popular Questions</h1>
        </div>
        
        {tabs.map((tab, idx) => (
          <TabPanel key={idx} value={idx.toString()}>
            <div className="flex flex-col gap-4">
              {tab.items.map((item, i) => (
                <div
                  key={i}
                  data-idx={i}
                  data-tab={idx.toString()}
                  data-item-id={item.id}
                  className="rounded-lg p-6 mb-6 shadow-lg border-t border-[#2196F3] w-[45%] max-w-3xl mx-auto transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <VisibilityIcon fontSize="small" />
                      {item.views || 0} Views
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <div className="mt-3 border-t border-gray-200">
                    <span className="text-gray-500 text-sm">{item.ques}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReactionClick(item.id, idx, i, 'like');
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className={getButtonStyle(idx, i, 'like')}
                    >
                      <ThumbUpRoundedIcon fontSize="small" />
                      {item.likes || 0}
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReactionClick(item.id, idx, i, 'dislike');
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className={getButtonStyle(idx, i, 'dislike')}
                    >
                      <ThumbDownRoundedIcon fontSize="small" />
                      {item.dislikes || 0}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Page;