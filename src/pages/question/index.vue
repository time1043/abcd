<template>
  <Question :questions />
</template>

<script setup lang="ts">
// const questions = [
//   {
//     id: "1970095484400439296",
//     description: "一个计算机上安装JDK后，该计算机不包含的是（）。",
//     choices: ["JRE", "JVM", "Eclipse", "javac.exe"],
//     answer: ["C"],
//   },
//   {
//     id: "1970095484400439297",
//     description: "关于Java语言的描述，错误的是（）。",
//     choices: [
//       "每一个.java文件编译后对应一个.class文件。",
//       ".java文件编译后，每一个class对应一个.class文件",
//       "Java源代码编译后产生的.class是字节码文件",
//       ".class文件在JVM上运行",
//     ],
//     answer: ["A"],
//   },
//   {
//     id: "1970095484400439309",
//     description:
//       '某Java源文件代码如下，该源文件应如何命名？\n```\nclass A {\n  int a;\n}\nclass B {\n  int b;\n}\nclass C {\n   public static void main(String[] args) {\n       System.out.print("HELLO!");\n   } \n}\n```',
//     choices: [
//       "一定是A.java",
//       "一定是B.java",
//       "一定是C.java",
//       "后缀是.java，文件名可以任意取，符合标识符规范即可。",
//     ],
//     answer: ["D"],
//   },
// ];

const questions = [
  {
    id: "1970095484400439296",
    description: "一个计算机上安装JDK后，该计算机不包含的是（）。",
    choices: ["JRE", "JVM", "Eclipse", "javac.exe"],
    answers: ["C", "D"],
  },
  {
    id: "1970095484400439297",
    description: "关于Java语言的描述，错误的是（）。",
    choices: [
      "每一个.java文件编译后对应一个.class文件。",
      ".java文件编译后，每一个class对应一个.class文件",
      "Java源代码编译后产生的.class是字节码文件",
      ".class文件在JVM上运行",
    ],
    answers: ["A", "D"],
  },
  {
    id: "1970095484400439309",
    description:
      '某Java源文件代码如下，该源文件应如何命名？\n```\nclass A {\n  int a;\n}\nclass B {\n  int b;\n}\nclass C {\n   public static void main(String[] args) {\n       System.out.print("HELLO!");\n   } \n}\n```',
    choices: [
      "一定是A.java",
      "一定是B.java",
      "一定是C.java",
      "后缀是.java，文件名可以任意取，符合标识符规范即可。",
    ],
    answers: ["A", "D"],
  },
];
</script>

<style scoped></style>
