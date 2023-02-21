import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
export async function getServerSideProps(context) {
  console.log('getServerSideProps');
  const resp =  await fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+context.params.id);
  const result = await resp.json();
  console.log('result', result);
  return {
    props: {
      topic: result
    }, // will be passed to the page component as props
  }
}
export default function Update({topic}) {
  const [title, setTitle] = useState(topic.title);
  const [body, setBody] = useState(topic.body);
  const router = useRouter();
  return (
    <>
      <h2>Update</h2>
      <form onSubmit={(evt)=>{
        evt.preventDefault();
        const title = evt.target.title.value;
        const body = evt.target.body.value;
        console.log('title', title);
        //send data to http://localhost:3000/topics with POST method
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+router.query.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            body: body
          })
        })
          .then(res=>res.json())
          .then(result=>{
            router.push('/read/'+result.id);
          })
      }}>
        <p><input type="text" name="title" placeholder="title" value={title} onChange={evt=>{
          setTitle(evt.target.value);
        }} /></p>
        <p><textarea name="body" placeholder="body" value={body} onChange={evt=>{
          setBody(evt.target.value);
        }}></textarea></p>
        <p><input type="submit" value="create" /></p>
      </form>
    </>
  )
}