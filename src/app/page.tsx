import { Grid, GridItem } from '@chakra-ui/react';
import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';

const Home = () => {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={'auto 1fr 100px'}
      gridTemplateColumns={'200px 1fr'}
      h='100vh'
      gap='1'
    >
      <GridItem padding='5px' area={'header'}>
        <Header />
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'nav'}>
        Nav
      </GridItem>
      <GridItem
        area={'main'}
        display='flex'
        justifyContent='center'
        overflow='scroll'
        maxH='1000px'
      >
        <Main />
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default Home;
