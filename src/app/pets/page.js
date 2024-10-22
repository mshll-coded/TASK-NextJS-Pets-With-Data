import PetsContainer from './components/PetsContainer';

async function PetsPage() {
  const prompise = await fetch('https://pets-react-query-backend.eapi.joincoded.com/pets');
  const pets = await prompise.json();

  return <PetsContainer pets={pets} />;
}

export default PetsPage;
