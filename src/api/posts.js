import MarkdownIt from 'markdown-it';
import YAML from 'js-yaml';

const md = new MarkdownIt();


const markdownFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' , eager: true });


function parseMarkdown(rawContent) {
  const startDelimiter = rawContent.indexOf('---');
  const endDelimiter = rawContent.indexOf('---', startDelimiter + 3); 

  if (startDelimiter === -1 || endDelimiter === -1 || startDelimiter !== 0) {
    return { data: {}, content: rawContent };
  }

  const frontmatterStr = rawContent.substring(startDelimiter + 3, endDelimiter).trim();
  
  const content = rawContent.substring(endDelimiter + 3).trim();
  let data = {};

  try {
    data = YAML.load(frontmatterStr);
    
    if (typeof data !== 'object' || data === null) {
        data = {};
    }
  } catch (e) {
    console.error("Frontmatter YAML 解析失败，请检查格式:", e, frontmatterStr.substring(0, 100) + '...');
  }

  return { data, content };
}


function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2, '0');
  const d_ = String(d.getDate()).padStart(2, '0');
  return `${y}/${m}/${d_}`;
}

let allPosts = [];

for (const path in markdownFiles) {
  const rawContent = markdownFiles[path];
  
  const id = path.split('/').pop().replace('.md', '');
  
  try {
    const { data, content } = parseMarkdown(rawContent); 

    if (!data || !data.date) {
      console.warn(`文章 [${id}] 缺少日期信息，已跳过。`);
      continue;
    }

    allPosts.push({
      id: id,
      frontmatter: {...data, date: formatDate(data.date)},
      excerpt: content.slice(0, 50)+ '...',
      content: md.render(content)
    });

  } catch (error) {
    console.error(`处理文章 [${id}] 时发生致命错误，已跳过该文件。`, error);
  }
}

// 按日期降序排序
if (allPosts.length > 0) {
    allPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}


export const getAllPosts = () => {
  return allPosts;
};

export const getPostById = (id) => {
  return allPosts.find(post => post.id === id);
};