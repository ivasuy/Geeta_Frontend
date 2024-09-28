import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PageContainer from "./PageContainer";
import { useHistory } from "react-router-dom";
import config from "../config";

const ChapterContainer = styled.div`
  padding: 2rem;
  background-color: #f7edd9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  width: 80%;
  position: relative;
  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
    margin: 1rem auto;
  }
`;

const ChapterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ChapterNumber = styled.h2`
  color: #ff8c00;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ChapterTitle = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ChapterSummary = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1.5rem;
  text-align: justify;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

const VerseList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const VerseCard = styled.div`
  background-color: #fffcf5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.2rem;
  color: #333;
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease-in-out;
  height: auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const VerseHeader = styled.h3`
  font-size: 1.3rem;
  color: #ff8c00;
  margin-bottom: 0.5rem;
  margin-top: 0;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const VerseContent = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const VerseTranslation = styled.p`
  margin-top: 0;
  font-style: italic;
  color: #555;
  @media (max-width: 768px) {
    font-size: 0.9rem;
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
  margin: 1rem;

  &:hover {
    background-color: #ff7f50;
    color: white;
  }
`;

const ChapterNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  color: #808080;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  outline: none;
  padding: 10px;

  &:hover {
    color: #ff7f50;
  }

  &:focus {
    color: #ff7f50;
  }

  ${(props) =>
    props.direction === "left" ? "left: -10rem;" : "right: -10rem;"}

  @media (max-width: 768px) {
    ${(props) =>
      props.direction === "left" ? "left: -10rem;" : "right: -10rem;"}
    font-size: 1.5rem;
  }

  @media (max-width: 1024px) {
    ${(props) =>
      props.direction === "left" ? "left: 0.5rem;" : "right: 0.5rem;"}
    font-size: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (max-width: 1200px) {
    ${(props) =>
      props.direction === "left" ? "left: 0.5rem;" : "right: 0.5rem;"}
    font-size: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    top: 1rem;
    transform: none;
    ${(props) =>
      props.direction === "left" ? "left: 0.5rem;" : "right: 0.5rem;"}
    font-size: 1.5rem;
  }
`;

const ChapterNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const VerseCount = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const InsightsSection = styled.div`
  background-color: #f9f4ef;
  margin: 2rem 2rem 2rem 5.2rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
    margin: 1rem auto;
  }
`;

const SectionTitle = styled.h2`
  color: #8b4513;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const InsightForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  background-color: #f9f4ef;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  background-color: #f9f4ef;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6347;
  }
`;

const InsightCard = styled.div`
  background-color: #f6ebdf;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const InsightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.6rem;
`;

const InsightAuthor = styled.h4`
  color: #d2691e;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const InsightDate = styled.span`
  color: #888;
  font-size: 0.8rem;
`;

const InsightContent = styled.p`
  color: #333;
  margin: 0;
  font-style: italic;
  line-height: 1.4;
`;

export default function ChapterPage() {
  const history = useHistory();
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [currentVersePage, setCurrentVersePage] = useState(0);
  const [versesPerPage] = useState(4);
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const language = localStorage.getItem("preferredLanguage");

  const commentsPerPage = 5;
  const indexOfLastComment = currentCommentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const totalCommentPages = Math.ceil(comments.length / commentsPerPage);

  const getTranslation = (englishText, hindiText) => {
    return language === "hindi" ? hindiText : englishText;
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    // if (storedLanguage) {
    //   setLanguage(storedLanguage);
    // }
  }, []);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/api/gita${
            language === "hindi" ? "/chapter/hindi" : "/chapter"
          }/${chapterId}` ,
          { withCredentials: true }
        );
        console.log(response.data);
        setChapter(response.data);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/api/gita/chapter/${chapterId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchChapter();
    fetchComments();
  }, [chapterId]);

  const handleNextPage = () => {
    if (currentVersePage < Math.floor(chapter.verses.length / versesPerPage)) {
      setCurrentVersePage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentVersePage > 0) {
      setCurrentVersePage((prevPage) => prevPage - 1);
    }
  };

const handleNextChapter = () => {
  const nextChapterId = (parseInt(chapterId) % 18) + 1;
  history.push(`/chapter/${nextChapterId}`);
};

  const handlePreviousChapter = () => {
    const prevChapterId = (parseInt(chapterId) - 1 + 18) % 18 || 18;
    history.push(`/chapter/${prevChapterId}`);
  };

  const paginatedVerses = chapter
    ? chapter.verses.slice(
        currentVersePage * versesPerPage,
        (currentVersePage + 1) * versesPerPage
      )
    : [];

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/gita/chapter/${chapterId}/comment`,
        {
          userName,
          comment: commentText,
        }
      );
      setComments([...comments, response.data]);
      setUserName("");
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  const handleNextCommentPage = () => {
    if (currentCommentPage < totalCommentPages) {
      setCurrentCommentPage(currentCommentPage + 1);
    }
  };

  const handlePreviousCommentPage = () => {
    if (currentCommentPage > 1) {
      setCurrentCommentPage(currentCommentPage - 1);
    }
  };

  return (
    <PageContainer>
      {chapter && (
        <>
          <ChapterContainer>
            <ChapterHeader>
              <ChapterNumber>
                {getTranslation("CHAPTER", "अध्याय")} {chapter.number}
              </ChapterNumber>
              <ChapterTitle>{chapter.title}</ChapterTitle>
            </ChapterHeader>
            <ChapterSummary>{chapter.summary}</ChapterSummary>
            <VerseCount>
              {getTranslation("Total Verses:", "कुल श्लोक:")}{" "}
              {chapter.verses.length}
            </VerseCount>
            <VerseList>
              {paginatedVerses.map((verse) => (
                <VerseCard key={verse.verseNumber}>
                  <VerseHeader>
                    {getTranslation("Verse", "श्लोक")} {verse.verseNumber}
                  </VerseHeader>
                  <VerseContent>{verse.shlok}</VerseContent>
                  <VerseTranslation>{verse.translation}</VerseTranslation>
                </VerseCard>
              ))}
            </VerseList>
            <ChapterNavigation>
              <NavButton onClick={handlePreviousPage}>&lt;</NavButton>
              <NavButton onClick={handleNextPage}>&gt;</NavButton>
            </ChapterNavigation>
            <ChapterNavButton direction="left" onClick={handlePreviousChapter}>
              ‹
            </ChapterNavButton>
            <ChapterNavButton direction="right" onClick={handleNextChapter}>
              ›
            </ChapterNavButton>
          </ChapterContainer>

          <InsightsSection>
            <SectionTitle>
              {getTranslation("Share Your Insights", "अपने विचार साझा करें")}
            </SectionTitle>
            <InsightForm onSubmit={handleSubmitComment}>
              <Input
                type="text"
                placeholder={getTranslation("Your Name", "आपका नाम")}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <Textarea
                placeholder={getTranslation(
                  "Share what you've learned from this chapter...",
                  "इस अध्याय से आपने क्या सीखा, साझा करें..."
                )}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              />
              <SubmitButton type="submit">
                {getTranslation("Submit Comment", "टिप्पणी जमा करें")}
              </SubmitButton>
            </InsightForm>
          </InsightsSection>

          <InsightsSection>
            <SectionTitle>
              {getTranslation("Community Insights", "समुदाय के विचार")} (
              {comments.length} {getTranslation("comments", "टिप्पणियाँ")})
            </SectionTitle>
            {currentComments.map((comment, index) => (
              <InsightCard key={index}>
                <InsightHeader>
                  <InsightAuthor>{comment.userName}</InsightAuthor>
                  <InsightDate>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </InsightDate>
                </InsightHeader>
                <InsightContent>{comment.comment}</InsightContent>
              </InsightCard>
            ))}
            <ChapterNavigation>
              <NavButton
                onClick={handlePreviousCommentPage}
                disabled={currentCommentPage === 1}
              >
                &lt;
              </NavButton>
              <span>
                {getTranslation("Page", "पृष्ठ")} {currentCommentPage}{" "}
                {getTranslation("of", "का")} {totalCommentPages}
              </span>
              <NavButton
                onClick={handleNextCommentPage}
                disabled={currentCommentPage === totalCommentPages}
              >
                &gt;
              </NavButton>
            </ChapterNavigation>
          </InsightsSection>
        </>
      )}
    </PageContainer>
  );
}
