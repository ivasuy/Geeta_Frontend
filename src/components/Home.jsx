import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import config from "../config";
import LanguageSelector from "./LanguageSelector";

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

const VerseOfDay = styled.section`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 50%;
  height: 120px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  @media (max-width: 768px) {
    width: 70%;
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
  font-style: italic;
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
    padding-bottom: 60px;
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
  @media (max-width: 768px) {
    justify-content: space-between;
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

  @media (max-width: 768px) {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    width: calc(100% - 2rem);
    margin-top: 0;
  }
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
  const [language, setLanguage] = useState(null);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const getTranslation = (englishText, hindiText) => {
    return language === "hindi" ? hindiText : englishText;
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    localStorage.setItem("preferredLanguage", selectedLanguage);
  };

  useEffect(() => {
    if (language) {
      fetchAllChapters();
      fetchVerseOfTheDay();
    }
  }, [language]);

  const fetchAllChapters = async () => {
    try {
      const chapterPromises = Array.from({ length: 18 }, (_, index) =>
        axios.get(
          `${config.apiUrl}/api/gita${
            language === "hindi" ? "/chapter/hindi" : "/chapter"
          }/${index + 1}`
        )
      );
      const responses = await Promise.all(chapterPromises);
      const chaptersData = responses.map((response) => ({
        number: response.data.number,
        title: response.data.title,
        verses: response.data.verses.length,
        summary: response.data.summary,
      }));
      setChapters(chaptersData);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const fetchVerseOfTheDay = async () => {
    const storedVerse = localStorage.getItem("verseOfTheDay");
    const storedTimestamp = localStorage.getItem("verseTimestamp");
    const currentTimestamp = new Date().getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (
      storedVerse &&
      storedTimestamp &&
      currentTimestamp - storedTimestamp < oneDayInMilliseconds
    ) {
      const storedVerseData = JSON.parse(storedVerse);
      setRandomVerse(storedVerseData.randomVerse);
      setRandomChapter(storedVerseData.randomChapter);
    } else {
      try {
        const randomChapter = Math.floor(Math.random() * 18) + 1;
        const response = await axios.get(
          `${config.apiUrl}/api/gita${
            language === "hindi" ? "/chapter/hindi" : "/chapter"
          }/${randomChapter}`
        );
        const chapter = response.data;
        const verses = chapter.verses;
        const randomVerseIndex = Math.floor(Math.random() * verses.length);
        const newRandomVerse = verses[randomVerseIndex];
        setRandomVerse(newRandomVerse);
        setRandomChapter(chapter);

        localStorage.setItem(
          "verseOfTheDay",
          JSON.stringify({
            randomVerse: newRandomVerse,
            randomChapter: chapter,
          })
        );
        localStorage.setItem("verseTimestamp", currentTimestamp.toString());
      } catch (error) {
        console.error("Error fetching random verse:", error);
      }
    }
  };

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
      {!language && (
        <LanguageSelector onSelectLanguage={handleLanguageSelect} />
      )}
      {language && (
        <>
          <Experience>
            <ExperienceTitle>
              {getTranslation("Experience the Gita", "गीता का अनुभव करें")}
            </ExperienceTitle>
            <Subtitle>
              {getTranslation(
                "Timeless Wisdom for Modern Life",
                "आधुनिक जीवन के लिए शाश्वत ज्ञान"
              )}
            </Subtitle>
          </Experience>
          <VerseOfDay>
            <VerseTitle>
              {getTranslation("Verse of the day", "आज का श्लोक")}
            </VerseTitle>
            {randomVerse && (
              <>
                <VerseParagraph>"{randomVerse.translation}"</VerseParagraph>
                <VerseReference>
                  - {getTranslation("Chapter", "अध्याय")} {randomChapter.number}
                  , {getTranslation("Verse", "श्लोक")} {randomVerse.verseNumber}
                </VerseReference>
              </>
            )}
          </VerseOfDay>
          {chapters.length > 0 && (
            <>
              <ChapterNavigation>
                <NavButton onClick={handlePreviousChapter}>&lt;</NavButton>
                <ChapterSlider ref={sliderRef}>
                  {chapters.map((chapter) => (
                    <ChapterCard key={chapter.number}>
                      <ChapterHeader>
                        {" "}
                        {getTranslation("Chapter", "अध्याय")} {chapter.number}
                      </ChapterHeader>
                      <ChapterContent>
                        <h4>{chapter.title}</h4>
                        <SummaryText>{chapter.summary}</SummaryText>
                        <VerseCount>
                          {chapter.verses} {getTranslation("verses", "श्लोक")}
                        </VerseCount>
                        <ReadButton
                          onClick={() => handleReadChapter(chapter.number)}
                        >
                          {getTranslation("Read Chapter", "अध्याय पढ़ें")}
                        </ReadButton>
                      </ChapterContent>
                    </ChapterCard>
                  ))}
                </ChapterSlider>
                <NavButton onClick={handleNextChapter}>&gt;</NavButton>
              </ChapterNavigation>
            </>
          )}
        </>
      )}
    </PageContainer>
  );
}
