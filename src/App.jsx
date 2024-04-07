import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import RickAndMortyTable from './RickAndMortyTable'; 

function App() {
  return (
    <>
    <body>
      <Header />
      <section className='presentation'>
        <RickAndMortyTable />
      </section>
      <Footer />
      </body>
    </>
  );
}

export default App;
