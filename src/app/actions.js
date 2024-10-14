'use server'

import { redirect } from "next/navigation";

const baseURL = "https://pets-react-query-backend.eapi.joincoded.com"

export async function fetchPets() {
  const response = await fetch(`${baseURL}/pets`, { next: { tags: ['pets'] } })
  const pets = await response.json()
  return pets
}

export async function fetchPetById(id) {
  let pet;

  const response = await fetch(`${baseURL}/pets/${id}`)

  try {
    pet = await response.json()
  } catch (error) {
    console.error("No pet found!")
  }

  if (!pet) redirect('/pets')

  return pet
}