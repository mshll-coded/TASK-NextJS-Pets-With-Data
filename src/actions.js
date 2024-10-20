'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const baseURL = "https://pets-react-query-backend.eapi.joincoded.com"
const headers = new Headers()
headers.append("Content-Type", "application/json")

export async function fetchPets() {
  const response = await fetch(`${baseURL}/pets`)
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

export async function createPet(formData) {
  const petData = {
    ...Object.fromEntries(formData),
    adopted: 0
  }

  const response = await fetch(`${baseURL}/pets`, {
    headers,
    method: "POST",
    body: JSON.stringify(petData)
  })

  const pet = await response.json()

  revalidatePath('/pets')
  revalidatePath('/pets/[id]', 'page')
  redirect(`/pets/${pet.id}`)
}

export async function deletePet(id) {
  const response = await fetch(`${baseURL}/pets/${id}`, {
    method: "DELETE"
  })

  revalidatePath('/pets')
  revalidatePath('/pets/[id]', 'page')
  redirect('/pets')
}