const HelpCenter = require("../models/HelpCenterSchema");

const addHelpCenter = async (req, res) => {
  try {
    const { type, title, description } = req.body;

    if (!type || !title || !description) {
      return res.status(400).json({
        message: "Type, Title and Description are required",
        status: false,
      });
    }

    const newArticle = new HelpCenter({ type, title, description });
    await newArticle.save();

    res.status(201).json({
      message: "Help Center article added successfully",
      data: newArticle,
      status: true,
    });
  } catch (err) {
    console.error("Add Help Center Error:", err);
    res.status(500).json({
      message: "Server error while adding help center article",
      status: false,
    });
  }
};

const getHelpCentersByType = async (req, res) => {
  try {
    const { type } = req.params;
    const articles = await HelpCenter.find({ type });

    if (articles.length === 0) {
      return res.status(404).json({
        message: "No articles found for the specified type",
        status: false,
      });
    }
    const formatted = articles.map((item) => ({
      id: item._id,
      type: item.type,
      title: item.title,
      description: item.description,
      views: item.views,
      likes: item.likes,
      dislikes: item.dislikes,
    }));

    res.status(200).json({
      message: `${type} articles fetched successfully`,
      data: formatted,
      status: true,
    });
  } catch (err) {
    console.error("Fetch Help Center By Type Error:", err);
    res.status(500).json({
      message: "Server error while fetching help center articles by type",
      status: false,
    });
  }
};

const getHelpCenters = async (req, res) => {
  try {
    const articles = await HelpCenter.find();

    const formatted = articles.map((item) => ({
      id: item._id,
      type: item.type,
      title: item.title,
      description: item.description,
      views: item.views,
      likes: item.likes,
      dislikes: item.dislikes,
    }));

    res.status(200).json({
      message: "Help Center articles fetched successfully",
      data: formatted,
      status: true,
    });
  } catch (err) {
    console.error("Fetch Help Center Error:", err);
    res.status(500).json({
      message: "Server error while fetching help center articles",
      status: false,
    });
  }
};

const updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await HelpCenter.findById(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        status: false,
      });
    }

    article.likes += 1;
    await article.save();

    res.status(200).json({
      message: "Like updated successfully",
      data: article,
      status: true,
    });
  } catch (err) {
    console.error("Update Like Error:", err);
    res.status(500).json({
      message: "Server error while updating like",
      status: false,
    });
  }
};

const updateDislikes = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await HelpCenter.findById(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        status: false,
      });
    }

    article.dislikes = Math.floor(article.dislikes/2);
    await article.save();

    res.status(200).json({
      message: "Dislike updated successfully",
      data: article,
      status: true,
    });
  } catch (err) {
    console.error("Update Dislike Error:", err);
    res.status(500).json({
      message: "Server error while updating dislike",
      status: false,
    });
  }
};

const updateViews = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await HelpCenter.findById(id);
    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        status: false,
      });
    }
    article.views += 1;
    await article.save();

    res.status(200).json({
      message: "View count updated successfully",
      data: article,
      status: true,
    });
  } catch (err) {
    console.error("Update View Error:", err);
    res.status(500).json({
      message: "Server error while updating view count",
      status: false,
    });
  }
}

const deleteHelpCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await HelpCenter.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Help Center article deleted successfully",
      status: true,
    });
  } catch (err) {
    console.error("Delete Help Center Error:", err);
    res.status(500).json({
      message: "Server error while deleting help center article",
      status: false,
    });
  }
};

module.exports = {
  addHelpCenter,
  getHelpCenters,
  getHelpCentersByType,
  updateLikes,
  updateDislikes,
  updateViews,
  deleteHelpCenter,
};
