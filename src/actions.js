'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const baseUrl = 'https://pets-react-query-backend.eapi.joincoded.com';
const headers = new Headers();
headers.append('Content-Type', 'application/json');

export async function fetchPets() {
  let pets;

  try {
    const response = await fetch(`${baseUrl}/pets`);
    pets = await response.json();
  } catch (error) {
    console.error('Not pets found');
    redirect('/');
    return;
  }

  return pets;
}

export async function fetchPetById(id) {
  let pet;
  try {
    const response = await fetch(`${baseUrl}/pets/${id}`);
    pet = await response.json();
  } catch (error) {
    console.error('Pet not found');
    redirect('/pets');
    return;
  }

  return pet;
}

export async function createPet(formData) {
  const pet = {
    ...Object.fromEntries(formData),
    adopted: 0,
  };

  const response = await fetch(`${baseUrl}/pets`, {
    method: 'POST',
    headers,
    body: JSON.stringify(pet),
  });

  const newPet = await response.json();
  revalidatePath('/pets');
  revalidatePath(`/pets/[id]`, 'page');
  redirect(`/pets/${newPet.id}`);
}

export async function deletePet(id) {
  const response = await fetch(`${baseUrl}/pets/${id}`, {
    method: 'DELETE',
    headers,
  });

  revalidatePath('/pets');
  revalidatePath(`/pets/[id]`, 'page');
  redirect(`/pets`);
}
