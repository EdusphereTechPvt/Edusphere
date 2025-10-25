import { motion } from "framer-motion";

export const AnimatedConnectionIcon = ({ status }) => {
  const variants = {
    connected: {
      scale: [1, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    connecting: {
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    },
    disconnected: {
      scale: 1,
      opacity: 0.7,
    }
  };

  const getIcon = () => {
    switch (status) {
      case "connected":
        return (
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={variants}
            animate={status}
          >
            <path
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <motion.path
              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              stroke="currentColor"
              strokeWidth="2"
              variants={{
                connected: {
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }
              }}
              animate={status}
            />
            <motion.circle
              cx="12"
              cy="12"
              r="2"
              fill="currentColor"
              variants={{
                connected: {
                  scale: [1, 1.3, 1],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                  }
                }
              }}
              animate={status}
            />
          </motion.svg>
        );
      case "connecting":
        return (
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={variants}
            animate={status}
          >
            <path
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </motion.svg>
        );
      default: // disconnected
        return (
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={variants}
            animate={status}
          >
            <path
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 8L16 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.svg>
        );
    }
  };

  return getIcon();
};