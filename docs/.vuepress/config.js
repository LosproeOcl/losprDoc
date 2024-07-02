module.exports = {
  title: 'LosprDoc',
  description: 'LosproeOclsDoc',
  theme: 'reco',
  base:'/losprDoc/',
  locales: {
        '/': {
          lang: 'zh-CN'
        }
  },
  themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { 
                text: 'LosproeOcl 的博客', 
                items: [
                    { text: 'Github', link: 'https://github.com/LosproeOcl' },
                    { text: 'Gitee', link: 'https://gitee.com/losproeocl' }
                ]
            }
        ],
  sidebar: [
            {
                title: 'Intro',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "main", path: "/" }
                ]
            },
            {
              title: "MathModel",
              path: '/MathModel/TOPSIS',
              collapsable: false, // 不折叠
              children: [
                { title: "TOPSIS", path: "/MathModel/TOPSIS" },
                { title: "VADER", path: "/MathModel/VADER" }
              ],
            }
          ]
    }
}