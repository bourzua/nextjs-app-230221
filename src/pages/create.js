import { useRouter } from 'next/router';
export default function Create() {
  const router = useRouter();
  return (
    <>
      <h2>Create</h2>
      <form onSubmit={(evt)=>{
        evt.preventDefault();
        const title = evt.target.title.value;
        const body = evt.target.body.value;
        console.log('title', title);
        //send data to http://localhost:3000/topics with POST method
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics', {
          method: 'POST',
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
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="create" /></p>
      </form>
    </>
  )
}