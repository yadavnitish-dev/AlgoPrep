import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
      );
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  console.log("submission", submissions);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem.description}</p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                    >
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Input:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.output}
                        </span>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-emerald-300 mb-2 text-base font-semibold">
                            Explanation:
                          </div>
                          <p className="text-base-content/70 text-lg font-sem">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-6 rounded-xl mb-6">
                  <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-4 pb-8 px-4 max-w-[1600px] mx-auto">
      {/* Custom Navbar for Problem Page */}
      <nav className="glass-panel p-3 mb-6 flex justify-between items-center rounded-2xl sticky top-4 z-40">
        <div className="flex-1 gap-4 flex items-center">
          <Link to={"/"} className="btn btn-circle btn-ghost btn-sm hover:bg-white/10 text-primary">
            <Home className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-white/10 mx-1"></div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-3 text-white">
                {problem.title} 
                <span className="badge badge-primary badge-outline text-xs">{problem.difficulty}</span>
            </h1>
          </div>
        </div>
        <div className="flex-none flex items-center gap-3">
            <div className="flex items-center gap-4 text-xs font-semibold text-base-content/50 mr-4 bg-base-300/30 px-3 py-1.5 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Updated {new Date(problem.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="w-1 h-1 bg-current rounded-full opacity-30"></div>
                <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{submissionCount} Submissions</span>
                </div>
                <div className="w-1 h-1 bg-current rounded-full opacity-30"></div>
                <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>95% Like</span>
                </div>
            </div>

          <button
            className={`btn btn-circle btn-sm ${
              isBookmarked ? "btn-primary" : "btn-ghost text-base-content/60"
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <select
            className="select select-bordered select-sm w-36 bg-base-200/50 focus:bg-base-200"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
        {/* Left Panel: Description & Submissions */}
        <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/5">
            <div className="tabs tabs-boxed bg-transparent p-2 border-b border-white/5">
              <button
                className={`tab tab-sm h-10 px-6 rounded-lg transition-all ${
                  activeTab === "description" ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("description")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Description
              </button>
              <button
                className={`tab tab-sm h-10 px-6 rounded-lg transition-all ${
                  activeTab === "submissions" ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("submissions")}
              >
                <Code2 className="w-4 h-4 mr-2" />
                Submissions
              </button>
              <button
                className={`tab tab-sm h-10 px-6 rounded-lg transition-all ${
                  activeTab === "discussion" ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("discussion")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Discuss
              </button>
              <button
                className={`tab tab-sm h-10 px-6 rounded-lg transition-all ${
                    activeTab === "hints" ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "hover:bg-white/5"
                }`}
                onClick={() => setActiveTab("hints")}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Hints
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
                {renderTabContent()}
            </div>
        </div>

        {/* Right Panel: Code Editor */}
        <div className="flex flex-col gap-4 h-full">
            <div className="glass-panel flex-1 rounded-2xl overflow-hidden flex flex-col border border-white/5 relative group">
                <div className="bg-base-300/30 backdrop-blur-md px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-mono text-base-content/60">
                        main.{
                            selectedLanguage.toLowerCase() === 'python' ? 'py' :
                            selectedLanguage.toLowerCase() === 'java' ? 'java' :
                            selectedLanguage.toLowerCase() === 'typescript' ? 'ts' :
                            'js'
                        }
                    </span>
                </div>
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        language={selectedLanguage.toLowerCase()}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: "on",
                            roundedSelection: false,
                            scrollBeyondLastLine: false,
                            readOnly: false,
                            automaticLayout: true,
                            padding: { top: 16 },
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    />
                </div>
            </div>

            {/* Action Bar & Test Cases */}
            <div className="glass-panel rounded-2xl p-4 border border-white/5">
                 {/* Only show test cases area if not submitted yet or minimal view */}
                 <div className="flex justify-between items-center">
                   <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost gap-2 text-base-content/70">
                             <Terminal className="w-4 h-4" />
                             Console
                        </button>
                   </div>
                   <div className="flex gap-3">
                      <button
                        className={`btn btn-sm btn-secondary/20 text-secondary hover:bg-secondary/30 gap-2 ${
                            isExecuting ? "loading" : ""
                        }`}
                        onClick={handleRunCode}
                        disabled={isExecuting}
                      >
                        {!isExecuting && <Play className="w-4 h-4" />}
                        Run
                      </button>
                      <button
                        className="btn btn-sm btn-primary shadow-lg shadow-primary/20 gap-2 px-6"
                        onClick={handleSubmit}
                        disabled={isExecuting}
                      >
                        {isExecuting ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <>Submit</>
                        )}
                      </button>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;