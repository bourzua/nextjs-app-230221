import Link from 'next/link'
export default function Home() {
  return (
    <>
      <h1>
        <Link href="/">WEB</Link>
      </h1>
      <ol>
        <li><Link href="/read/1">html</Link></li>
        <li><Link href="/read/2">css</Link></li>
      </ol>
      <article>
        <h2>Read</h2>
        Hello, Read
      </article>
      <ul>
        <li><Link href="/create">Create</Link></li>
        <li><Link href="/update">Update</Link></li>
        <li><Link href="/delete">Delete</Link></li>
      </ul>
    </>
  )
}
