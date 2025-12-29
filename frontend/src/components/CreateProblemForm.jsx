import React from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod"
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
  Terminal,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});


const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

// Sample problem data for another type of question
const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

const CreateProblemForm = () => {
    const [sampleType , setSampleType] = useState("DP")
    const navigation = useNavigate();
    const {register , control , handleSubmit , reset , formState:{errors}} = useForm(
        {
            resolver:zodResolver(problemSchema),
            defaultValues:{
                 testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
            }
        }
    )

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replacetestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const [isLoading , setIsLoading] = useState(false);

  const onSubmit = async (value)=>{
   try {
    setIsLoading(true)
    const res = await axiosInstance.post("/problems/create-problem" , value)
    console.log(res.data);
    toast.success(res.data.message || "Problem Created successfully⚡");
    navigation("/");

   } catch (error) {
    console.log(error);
    toast.error("Error creating problem")
   }
   finally{
      setIsLoading(false);
   }
  }

  const loadSampleData=()=>{
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem
  
   replaceTags(sampleData.tags.map((tag) => tag));
    replacetestcases(sampleData.testcases.map((tc) => tc));

   // Reset the form with sample data
    reset(sampleData);
}

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-secondary/20 blur-[100px] rounded-full -z-10 opacity-30 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto">
        <div className="glass-panel rounded-2xl border border-white/5 shadow-2xl p-6 md:p-8 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                Create New Problem
              </h2>
              <p className="text-base-content/60 mt-1 ml-1">Contribute challenges to the community</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="join bg-black/20 border border-white/5 rounded-lg p-1">
                <button
                  type="button"
                  className={`btn btn-sm border-0 ${
                    sampleType === "DP" 
                    ? "bg-primary text-white shadow-lg" 
                    : "btn-ghost hover:bg-white/5"
                  }`}
                  onClick={() => setSampleType("DP")}
                >
                  DP
                </button>
                <button
                  type="button"
                  className={`btn btn-sm border-0 ${
                    sampleType === "string" 
                    ? "bg-primary text-white shadow-lg" 
                    : "btn-ghost hover:bg-white/5"
                  }`}
                  onClick={() => setSampleType("string")}
                >
                  String
                </button>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-ghost border border-white/10 hover:bg-white/5 gap-2"
                onClick={loadSampleData}
              >
                <Download className="w-4 h-4" />
                Load Sample
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control md:col-span-2">
                <label className="label pl-0">
                  <span className="label-text font-medium text-base-content/80">Problem Title</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 transition-all ${errors.title ? 'input-error' : ''}`}
                  {...register("title")}
                  placeholder="e.g. Two Sum"
                />
                {errors.title && <span className="text-error text-xs mt-1">{errors.title.message}</span>}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label pl-0">
                  <span className="label-text font-medium text-base-content/80">Description</span>
                </label>
                <textarea
                  className={`textarea textarea-bordered min-h-32 w-full bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 transition-all text-base leading-relaxed ${errors.description ? 'textarea-error' : ''}`}
                  {...register("description")}
                  placeholder="Describe the problem in detail..."
                />
                {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
              </div>

              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text font-medium text-base-content/80">Difficulty</span>
                </label>
                <select
                  className={`select select-bordered w-full bg-black/20 border-white/10 focus:border-primary/50 transition-all ${errors.difficulty ? 'select-error' : ''}`}
                  {...register("difficulty")}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && <span className="text-error text-xs mt-1">{errors.difficulty.message}</span>}
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-black/20 rounded-xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  Tags
                </h3>
                <button
                  type="button"
                  className="btn btn-xs btn-outline btn-secondary"
                  onClick={() => appendTag("")}
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="input input-sm input-bordered flex-1 bg-black/40 border-white/10 focus:border-secondary/50"
                      {...register(`tags.${index}`)}
                      placeholder="e.g. Array"
                    />
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs btn-square hover:bg-error/20 hover:text-error"
                      onClick={() => removeTag(index)}
                      disabled={tagFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.tags && <div className="mt-2 text-error text-sm">{errors.tags.message}</div>}
            </div>

            {/* Test Cases Section */}
            <div className="bg-black/20 rounded-xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Test Cases
                </h3>
                <button
                  type="button"
                  className="btn btn-xs btn-outline btn-success"
                  onClick={() => appendTestCase({ input: "", output: "" })}
                >
                  <Plus className="w-3 h-3" /> Add Case
                </button>
              </div>
              
              <div className="space-y-4">
                {testCaseFields.map((field, index) => (
                  <div key={field.id} className="bg-black/40 rounded-lg p-4 border border-white/5 relative group">
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs btn-square absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/20 hover:text-error"
                      onClick={() => removeTestCase(index)}
                      disabled={testCaseFields.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <h4 className="text-xs font-mono text-base-content/50 mb-3 uppercase tracking-wider">Case #{index + 1}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label pt-0"><span className="label-text text-xs font-mono opacity-70">Input</span></label>
                        <textarea
                          className="textarea textarea-bordered min-h-16 w-full bg-black/60 border-white/5 font-mono text-sm leading-relaxed focus:border-success/50"
                          {...register(`testcases.${index}.input`)}
                          placeholder="Input data..."
                        />
                         {errors.testcases?.[index]?.input && <span className="text-error text-xs mt-1">{errors.testcases[index].input.message}</span>}
                      </div>
                      <div className="form-control">
                        <label className="label pt-0"><span className="label-text text-xs font-mono opacity-70">Expected Output</span></label>
                         <textarea
                          className="textarea textarea-bordered min-h-16 w-full bg-black/60 border-white/5 font-mono text-sm leading-relaxed focus:border-success/50"
                          {...register(`testcases.${index}.output`)}
                          placeholder="Expected output..."
                        />
                         {errors.testcases?.[index]?.output && <span className="text-error text-xs mt-1">{errors.testcases[index].output.message}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
               {errors.testcases && !Array.isArray(errors.testcases) && (
                 <div className="mt-2 text-error text-sm">{errors.testcases.message}</div>
               )}
            </div>

            {/* Language Specific Sections */}
            <div className="space-y-6">
              {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
                <div key={language} className="collapse collapse-arrow bg-black/20 border border-white/5 rounded-xl overflow-hidden">
                  <input type="checkbox" defaultChecked={language === "JAVASCRIPT"} /> 
                  <div className="collapse-title text-base font-semibold flex items-center gap-2 p-4">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-base-300 border border-white/5`}>
                        <Code2 className="w-4 h-4" />
                     </div>
                     {language} Configuration
                  </div>
                  <div className="collapse-content p-6 border-t border-white/5 space-y-6">
                    
                    {/* Starter Code */}
                     <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-base-content/80">
                           <Terminal className="w-4 h-4" /> Starter Code
                        </h4>
                        <div className="border border-white/10 rounded-lg overflow-hidden">
                          <Controller
                            name={`codeSnippets.${language}`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="200px"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 13,
                                  lineNumbers: "on",
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                  padding: { top: 16, bottom: 16 },
                                }}
                              />
                            )}
                          />
                        </div>
                        {errors.codeSnippets?.[language] && <div className="text-error text-xs mt-1">{errors.codeSnippets[language].message}</div>}
                     </div>

                    {/* Reference Solution */}
                     <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-base-content/80">
                           <CheckCircle2 className="w-4 h-4 text-success" /> Valid Solution
                        </h4>
                        <div className="border border-white/10 rounded-lg overflow-hidden">
                          <Controller
                            name={`referenceSolutions.${language}`}
                            control={control}
                            render={({ field }) => (
                              <Editor
                                height="200px"
                                language={language.toLowerCase()}
                                theme="vs-dark"
                                value={field.value}
                                onChange={field.onChange}
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 13,
                                  lineNumbers: "on",
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                  padding: { top: 16, bottom: 16 },
                                }}
                              />
                            )}
                          />
                        </div>
                         {errors.referenceSolutions?.[language] && <div className="text-error text-xs mt-1">{errors.referenceSolutions[language].message}</div>}
                     </div>

                     {/* Examples */}
                     <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                        <label className="text-sm font-semibold mb-4 block">Language Specific Examples</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="form-control">
                              <span className="label-text text-xs mb-1 opacity-70">Input</span>
                              <textarea
                                className="textarea textarea-sm textarea-bordered w-full bg-black/40 font-mono text-xs"
                                {...register(`examples.${language}.input`)}
                                placeholder="Input..."
                              />
                           </div>
                           <div className="form-control">
                              <span className="label-text text-xs mb-1 opacity-70">Output</span>
                              <textarea
                                className="textarea textarea-sm textarea-bordered w-full bg-black/40 font-mono text-xs"
                                {...register(`examples.${language}.output`)}
                                placeholder="Output..."
                              />
                           </div>
                           <div className="form-control md:col-span-2">
                              <span className="label-text text-xs mb-1 opacity-70">Explanation</span>
                              <textarea
                                className="textarea textarea-sm textarea-bordered w-full bg-black/40 text-xs"
                                {...register(`examples.${language}.explanation`)}
                                placeholder="Explain logic..."
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Info */}
             <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white mb-4">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Hints & Extras
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className="label pl-0"><span className="label-text font-medium text-base-content/80">Constraints</span></label>
                     <textarea
                      className="textarea textarea-bordered min-h-24 w-full bg-black/40 border-white/10"
                      {...register("constraints")}
                      placeholder="e.g. 1 <= n <= 10^5"
                    />
                    {errors.constraints && <span className="text-error text-xs mt-1">{errors.constraints.message}</span>}
                  </div>
                   <div>
                    <label className="label pl-0"><span className="label-text font-medium text-base-content/80">Hints</span></label>
                     <textarea
                      className="textarea textarea-bordered min-h-20 w-full bg-black/40 border-white/10"
                      {...register("hints")}
                      placeholder="Helpful tips..."
                    />
                  </div>
                   <div>
                    <label className="label pl-0"><span className="label-text font-medium text-base-content/80">Editorial</span></label>
                     <textarea
                      className="textarea textarea-bordered min-h-32 w-full bg-black/40 border-white/10"
                      {...register("editorial")}
                      placeholder="Full solution explanation..."
                    />
                  </div>
                </div>
             </div>

            <div className="flex justify-end pt-6 border-t border-white/5">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Publish Problem
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Overlay Loading */}
       {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-lg font-medium text-white">Creating Problem...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateProblemForm