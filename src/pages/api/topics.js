// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {id: 1, title: 'HTML', description: 'HTML is ...'},
    {id: 2, title: 'CSS', description: 'CSS is ...'}
  ])
}
