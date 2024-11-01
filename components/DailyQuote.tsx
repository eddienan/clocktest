'use client';

import { useState, useEffect } from 'react';
import styles from './DailyQuote.module.css';

const quotes = [
  { text: "✨ 天行健，君子以自强不息。", author: "周易" },
  { text: "🚶‍♂️ 不积跬步，无以至千里。", author: "荀子" },
  { text: "⛵ 长风破浪会有时，直挂云帆济沧海。", author: "李白" },
  { text: "🎯 选择比努力更重要，观念比选择更重要。", author: "张一鸣" },
  { text: "🤝 短期交往说话忽悠会有溢价，长期交往说话实在会有溢价。", author: "张一鸣" },
  { text: "💪 用心认真的折腾是没有风险的。", author: "张一鸣" },
  { text: "🌟 不抱怨，想方法。", author: "张一鸣" },
  { text: "🎭 做一个表里如一的人，这不仅是品德，更是经济的选择。", author: "张一鸣" },
  { text: "❓ 好的问题就是一半的答案。", author: "张一鸣" },
  { text: "✅ 将事情做满和将事情做好是不一样的。", author: "张一鸣" },
  { text: "😴 保证足够睡眠是积极高效的第一步。", author: "张一鸣" },
  { text: "🤔 凡事就怕不认真，不思考。", author: "张一鸣" },
  { text: "🏃‍♂️ 唯有行动才能改变事情。", author: "张一鸣" },
  { text: "🎯 年轻人不要试图追求安全感，真正的安全感来自对自己的信心。", author: "王兴" },
  { text: "🌱 谦虚的人能看到不足，自信的人能在知道不足时依然积极。", author: "稻盛和夫" },
  { text: "🤝 成为一个受人信任的人，比知识和技能更重要。", author: "周其仁" },
  { text: "📚 最贵的是学费，最重要的是经验。", author: "马云" },
  { text: "🌅 人生，和谁一起在路上，看什么风景。", author: "王兴" },
  { text: "👀 在这个时代，最宝贵的是你的注意力。", author: "马化腾" },
  { text: "✨ 做正确的事，比把事情做正确更重要。", author: "德鲁克" }
];

export default function DailyQuote() {
  const [quote, setQuote] = useState<typeof quotes[0] | null>(null);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const getRandomQuote = () => {
    let availableIndexes = Array.from(Array(quotes.length).keys())
      .filter(i => !usedIndexes.includes(i));
    
    if (availableIndexes.length === 0) {
      setUsedIndexes([]);
      availableIndexes = Array.from(Array(quotes.length).keys());
    }
    
    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    setUsedIndexes(prev => [...prev, randomIndex]);
    return quotes[randomIndex];
  };

  const handleClick = () => {
    const newQuote = getRandomQuote();
    setQuote(newQuote);
  };

  useEffect(() => {
    setMounted(true);
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const initialIndex = seed % quotes.length;
    
    setQuote(quotes[initialIndex]);
    setUsedIndexes([initialIndex]);

    return () => setMounted(false);
  }, []);

  if (!mounted || !quote) return null;

  return (
    <div 
      className={styles.quoteContainer}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.quote}>
        <div className={styles.quoteText}>{quote.text}</div>
        <div className={styles.quoteAuthor}>—— {quote.author}</div>
      </div>
    </div>
  );
} 