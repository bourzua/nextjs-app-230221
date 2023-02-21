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
export default function Read({topic}) {
  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  )
}