import localforage from "localforage";
import { getContact, getContacts } from "../contacts";

export async function getContactsLoaders({ request }) {
  // localforage.clear() //Clear all contacts
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);

  return { contacts, q };
}

export async function getContactLoader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { contact };
}
