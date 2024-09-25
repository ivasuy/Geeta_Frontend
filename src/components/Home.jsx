import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PageContainer from "./PageContainer";

const Experience = styled.section`
  text-align: center;
  margin-bottom: 2rem;
`;

const ExperienceTitle = styled.h2`
  color: #8b4513;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #d2691e;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const StartButton = styled.button`
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

const VerseOfDay = styled.section`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 60%;
  height: 120px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }
`;

const VerseTitle = styled.h3`
  color: #ff8c00;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const VerseParagraph = styled.p`
  /* font-style: italic; */
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.4;
`;

const VerseReference = styled.p`
  text-align: right;
  color: #8b4513;
  font-weight: bold;
`;

// const SeeMoreButton = styled.button`
//   background-color: transparent;
//   color: #ff8c00;
//   border: none;
//   font-size: 0.9rem;
//   cursor: pointer;
//   font-weight: bold;
//   text-transform: uppercase;
//   position: absolute;
//   bottom: 2rem;
//   left: 1rem;

//   @media (max-width: 480px) {
//     font-size: 0.75rem;
//     bottom: 2rem;
//     left: 0.4rem;
//   }
// `;

const ChapterSlider = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChapterCard = styled.div`
  position: absolute;
  width: 60%;
  height: 250px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  color: #333;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.5s ease;
  left: calc(50% - 30%);
  top: 0;
  opacity: 0;
  z-index: 0;
  transform: scale(0.8);
  filter: blur(5px);

  &.active {
    transform: scale(1);
    left: 19%;
    opacity: 1;
    z-index: 10;
    filter: none;
  }

  &.next,
  &.prev {
    opacity: 0.6;
    filter: blur(2px);
    z-index: 5;
  }

  &.next {
    transform: translateX(180px) scale(0.9);
  }

  &.prev {
    transform: translateX(-180px) scale(0.9);
  }

  @media (max-width: 768px) {
    width: 50%;
    left: calc(50% - 25%);
    height: 280px;
  }
`;

const ChapterHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff8c00;
  margin-bottom: 0.5rem;
`;

const ChapterContent = styled.div`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  h4 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const SummaryText = styled.p`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 0.75rem;
  max-height: 4.5rem;
  margin-top: 0;
`;

const ReadButton = styled.button`
  background-color: #ffdab9;
  border-radius: 8px;
  color: #8b4513;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  align-self: center;
  margin-top: 1rem;
`;

const VerseCount = styled.p`
  margin-top: 0;
  font-weight: bold;
`;

const ChapterNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  color: #ff7f50;
  border: 2px solid #ff7f50;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-80%);
  z-index: 10;

  &:first-child {
    left: 10%;
  }

  &:last-child {
    right: 10%;
  }

  &:hover {
    background-color: #ff7f50;
    color: white;
  }
  @media (max-width: 768px) {
    position: absolute;
    top: auto;
    transform: none;
    border: none;
    font-size: 1.5rem;
    height: auto;
    width: auto;
    padding: 0.5rem;

    &:first-child {
      left: -2rem;
    }

    &:last-child {
      right: -2rem;
    }
    &:hover {
      background-color: transparent;
      color: #ff4400;
    }
  }
`;

export default function Home() {
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [randomVerse, setRandomVerse] = useState(null);
  const [randomChapter, setRandomChapter] = useState(null);
  const navigate = useNavigate();

  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchVerseOfTheDay = async () => {
      try {
        const randomChapter = Math.floor(Math.random() * 18) + 1;
        const response = await axios.get(
          `https://geetabackend-production.up.railway.app/api/gita/chapter/${randomChapter}`
        );
        const chapter = response.data;
        const verses = response.data.verses;
        const randomVerseIndex = Math.floor(Math.random() * verses.length);
        setRandomVerse(verses[randomVerseIndex]);
        setRandomChapter(chapter);
      } catch (error) {
        console.error("Error fetching random verse:", error);
      }
      console.log(randomVerse);
    };

    const fetchChapters = async () => {
      try {
        let fetchedChapters = [];
        for (let i = 1; i <= 18; i++) {
          const response = await axios.get(
            `https://geetabackend-production.up.railway.app/api/gita/chapter/${i}`
          );
          fetchedChapters.push({
            number: response.data.number,
            title: response.data.title,
            verses: response.data.verses.length,
            summary: response.data.summary,
          });
        }
        setChapters(fetchedChapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchVerseOfTheDay();
    fetchChapters();
  }, []);

  useEffect(() => {
    if (chapters.length > 0) {
      loadShow();
    }
  }, [currentChapterIndex, chapters]);

  const loadShow = () => {
    if (!sliderRef.current) return;

    const items = sliderRef.current.children;
    const active = currentChapterIndex;
    const itemCount = chapters.length;

    for (let i = 0; i < itemCount; i++) {
      const item = items[i];
      const stt = (i - active + itemCount) % itemCount;
      item.classList.remove("active", "next", "prev");

      if (stt === 0) {
        item.classList.add("active");
      } else if (stt === 1) {
        item.classList.add("next");
      } else if (stt === itemCount - 1) {
        item.classList.add("prev");
      }
    }
  };

  const handleNextChapter = () => {
    setCurrentChapterIndex((prevIndex) => (prevIndex + 1) % chapters.length);
  };

  const handlePreviousChapter = () => {
    setCurrentChapterIndex(
      (prevIndex) => (prevIndex - 1 + chapters.length) % chapters.length
    );
  };

  const handleReadChapter = (chapterNumber) => {
    navigate(`/chapter/${chapterNumber}`);
  };

  return (
    <PageContainer>
      <Experience>
        <ExperienceTitle>Experience the Gita</ExperienceTitle>
        <Subtitle>Timeless Wisdom for Modern Life</Subtitle>
        {/* <StartButton>Start Reading</StartButton> */}
      </Experience>
      <VerseOfDay>
        <VerseTitle>Verse of the day</VerseTitle>
        {randomVerse && (
          <>
            <VerseParagraph>"{randomVerse.translation}"</VerseParagraph>
            <VerseReference>
              - Chapter {randomChapter.number}, Verse {randomVerse.verseNumber}
            </VerseReference>
            {/* <SeeMoreButton>See More</SeeMoreButton> */}
          </>
        )}
      </VerseOfDay>
      {chapters.length > 0 && (
        <>
          <ChapterNavigation>
            <NavButton onClick={handlePreviousChapter}>&lt;</NavButton>
            <ChapterSlider ref={sliderRef}>
              {chapters.map((chapter, index) => (
                <ChapterCard key={chapter.number}>
                  <ChapterHeader>Chapter {chapter.number}</ChapterHeader>
                  <ChapterContent>
                    <h4>{chapter.title}</h4>
                    <SummaryText>{chapter.summary}</SummaryText>
                    <VerseCount>{chapter.verses} verses</VerseCount>
                    <ReadButton
                      onClick={() => handleReadChapter(chapter.number)}
                    >
                      Read Chapter
                    </ReadButton>
                  </ChapterContent>
                </ChapterCard>
              ))}
            </ChapterSlider>
            <NavButton onClick={handleNextChapter}>&gt;</NavButton>
          </ChapterNavigation>
        </>
      )}
    </PageContainer>
  );
}
