import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
export default function Layout({children}) {
  // console.log(children);
  const [topics, setTopics] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();
  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics')
    .then(res=>res.json())
    .then(result=> setTopics(result));
  }, [router.asPath])
  // const lis = [
  //   <li><Link href="/read/1">html</Link></li>,
  //   <li><Link href="/read/2">css</Link></li>
  // ]
  // const lis = [];
  // for(let i=0; i<topics.length; i++) {
  //   lis.push(<li key={topics[i].id}>{topics[i].title}</li>);
  // }
  // const lis = topics.map(e=><li key={e.id}>{e.title}</li>);
  return <Container maxWidth="sm">
  <h1>
    <Link href="/">WEB</Link>
  </h1>
  <Grid container>
    <Grid item xs={12} sm={3} md={5}>
    <ol>
      {topics.map(e=><li key={e.id}>
      <Link href={"/read/" + e.id}>{e.title}</Link>
      </li>)}
    </ol>
    </Grid>
    <Grid item xs={12} sm={9} md={7}>
      <article>
        {children}
      </article>
      <Box sx={{
          mt: 1
        }}>
        <Button variant="contained" components={Link} href="/create" sx={{
          mr: 1
        }}>Create</Button>
        { router.query.id === undefined ? null: <><Button variant="contained" components={Link} href={"/update/"+router.query.id} sx={{
          mr: 1
        }}>Update</Button>
        <Button variant="contained" onClick={()=>{
          setOpenDelete(true);
        }}>Delete</Button></>}
      </Box>
    </Grid>
  </Grid>
  <Dialog open={openDelete} onClose={()=>{
      setOpenDelete(false);
    }}>
      <DialogTitle id="alert-dialog-title">
        Really?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          한번 삭제는 영원한 삭제
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{setOpenDelete(false)}}>취소</Button>
        <Button autoFocus onClick={()=>{
          fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+router.query.id, {
            method: 'DELETE'
          })
            .then(res=>res.json())
            .then(result=>{
              router.push('/');
              setOpenDelete(false);
            })
        }}>
          진짜삭제
        </Button>
      </DialogActions>
    </Dialog>
</Container>
}