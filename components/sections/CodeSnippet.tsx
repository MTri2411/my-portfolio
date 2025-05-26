"use client"

import { Box } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { CardHoverEffect } from "../aceternity-ui/card-hover-effect"
import { FaNodeJs, FaReact, FaDatabase, FaJs, FaCode } from "react-icons/fa"
import { TextGradientEffect } from "../aceternity-ui/text-gradient-effect"
import { IconType } from "react-icons"
import { useEffect, useState } from "react"
import { ColourfulText } from "../aceternity-ui/colourful-text"
import AboutMeContent from "@/components/sections/AboutMeContent"
import ProjectsContent from "@/components/sections/ProjectsContent"
import ContactContent from "@/components/sections/ContactContent"

interface TechCardProps {
  name: string;
  icon: IconType;
  description: string;
  code: string;
  isVisible: boolean;
}

interface CodeSnippetProps {
  activeNavId: string;
}

// Sample code snippets cho card stack
const codeSnippets = [
  {
    name: 'React',
    icon: FaReact,
    description: 'Frontend Library for building UI',
    code: `import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(result => setData(result));
  }, []);
  
  return (
    <div className="container">
      <h1>React Application</h1>
      {data.map(item => (
        <div key={item.id} className="card">
          {item.title}
        </div>
      ))}
    </div>
  );
}`,
  },
  {
    name: 'React Native',
    icon: FaReact,
    description: 'Cross-platform Mobile Development',
    code: `import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MobileApp = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile App</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  card: { padding: 15, marginVertical: 8, backgroundColor: '#f0f0f0' }
});`,
  },
  {
    name: 'NodeJS',
    icon: FaNodeJs,
    description: 'Backend JavaScript Runtime',
    code: `const fs = require('fs');
const path = require('path');

// Read config file
const readConfig = () => {
  try {
    const configPath = path.join(__dirname, 'config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config:', error);
    return { error: true };
  }
};

const config = readConfig();
console.log('Application starting with config:', config);

// Process data in async way
async function processData(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.map(item => ({ ...item, processed: true })));
    }, 1000);
  });
}`,
  },
  {
    name: 'Express',
    icon: FaNodeJs,
    description: 'Web Framework for Node.js',
    code: `const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

app.post('/api/users', (req, res) => {
  // Create new user logic
  res.status(201).json({ success: true, user: req.body });
});

app.listen(port, () => console.log(\`Server running on port \${port}\`));`,
  },
  {
    name: 'MongoDB',
    icon: FaDatabase,
    description: 'NoSQL Database',
    code: `const { MongoClient, ObjectId } = require('mongodb');

// Connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const database = client.db("myDatabase");
    const users = database.collection("users");
    
    // Create a document
    const user = { name: "John", email: "john@example.com" };
    const insertResult = await users.insertOne(user);
    console.log("Inserted document:", insertResult);
    
    // Find documents
    const cursor = users.find({ name: "John" });
    await cursor.forEach(doc => console.log(doc));
    
  } finally {
    await client.close();
  }
}

run().catch(console.error);`,
  },
];

// Sửa TechCard: không render icon lớn nữa
const TechCard = ({ name, icon: Icon, description, code, isVisible }: TechCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.96 }}
    animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.92 }}
    exit={{ opacity: 0, scale: 0.9, y: -50 }}
    transition={{ duration: 0.5 }}
    className="w-full absolute"
    style={{
      zIndex: isVisible ? 10 : 0,
      pointerEvents: isVisible ? "auto" : "none"
    }}
  >
    <Box
      sx={{
        bgcolor: "rgba(2, 8, 20, 0.7)",
        color: "#f1f5f9",
        borderRadius: 3,
        overflow: "hidden",
        p: 2,
        height: "400px",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
      }}
    >
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          {Icon && <Icon size={28} style={{ verticalAlign: 'middle', color: '#60a5fa' }} />}
          <Box sx={{ color: '#94a3b8', fontSize: 18, fontWeight: 600 }}>{name}</Box>
        </Box>
        <Box sx={{ color: '#94a3b8', fontSize: 16, mt: 0.5 }}>{description}</Box>
      </Box>
      <Box sx={{ flex: 1, overflow: "hidden", bgcolor: "rgba()", borderRadius: 1, p: 3, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)", backdropFilter: "blur(10px)" }}>
        <ColourfulText
          text={code}
          className="h-full overflow-auto text-[0.95rem] font-mono"
          highlightClass={{
            keyword: "text-[#c792ea] font-semibold",
            string: "text-[#a5e844]",
            comment: "text-[#676e95] italic",
            number: "text-[#ff9d00]",
            function: "text-[#82aaff]",
            property: "text-[#4fc1ff]",
            operator: "text-[#89ddff]",
            jsxTag: "text-[#ff596f]",
            jsxAttr: "text-[#ffcb6b]",
            variable: "text-[#f78c6c]",
            plain: "text-[#d4d4d8]"
          }}
        />
      </Box>
    </Box>
  </motion.div>
);

const CodeSnippet = ({ activeNavId }: CodeSnippetProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % codeSnippets.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Container style chung cho tất cả content
  const contentContainerStyle = {
    height: "100%",
    overflow: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Quan trọng: Chỉ render khi đã client-side để tránh lỗi hydration
  if (!isMounted) {
    return (
      <Box
        sx={{
          ...contentContainerStyle,
          backgroundColor: "rgba(2, 8, 20, 0.3)",
          borderRadius: "0.75rem",
        }}
      />
    );
  }

  // Nội dung động theo NAV_ITEMS
  if (activeNavId === "about-me") {
    return (
      <Box sx={contentContainerStyle}>
        <AboutMeContent />
      </Box>
    );
  }
  
  if (activeNavId === "projects") {
    return (
      <Box sx={contentContainerStyle}>
        <ProjectsContent />
      </Box>
    );
  }
  
  if (activeNavId === "contact") {
    return (
      <Box sx={contentContainerStyle}>
        <ContactContent />
      </Box>
    );
  }

  // Mặc định: code stack như cũ
  return (
    <Box
      sx={{
        ...contentContainerStyle,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: "500px",
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          {codeSnippets.map((snippet, index) => (
            <TechCard
              key={`${snippet.name}-${index}`}
              name={snippet.name}
              icon={snippet.icon}
              description={snippet.description}
              code={snippet.code}
              isVisible={index === activeIndex}
            />
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default CodeSnippet;
