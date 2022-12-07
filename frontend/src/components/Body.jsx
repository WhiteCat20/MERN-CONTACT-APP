import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Body = () => {
  //state for showing contacts
  const [contacts, setContacts] = useState([]);

  //state for posting contacts
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, []);

  //method untuk menampilkan data
  const getContacts = async () => {
    const response = await axios.get("http://localhost:5000/api/contacts");
    setContacts(response.data);
  };

  //method untuk storing data
  const postContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contacts", {
        name,
        email,
        address,
      });
      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  //method untuk delete data
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-5 w-[80%]">
      <div className="flex justify-between flex-wrap">
        {/* Contacts */}
        {contacts.map((contact, i) => (
          <div
            key={contact._id}
            className="bg-white py-5 px-10 m-4 w-[60%] h-[30%] rounded-md shadow-md"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-emerald-600 text-2xl font-semibold">
                {contact.name}
              </h1>
              <div
                onClick={() => deleteContact(contact._id)}
                className="bg-zinc-100 hover:bg-zinc-200 cursor-pointer py-2.5 px-3 rounded-full"
              >
                <img src="/trash-can.svg" alt="react" width="20" />
              </div>
            </div>
            <p className="font-normal my-3">{contact.email}</p>
            <p className="font-normal my-3">{contact.address}</p>
          </div>
        ))}
        {/* End of Contacts */}
        {/* Form */}
        <div className="bg-white absolute right-10 m-4 py-5 w-[25%] px-6 rounded-md shadow-md">
          <h1 className="text-xl text-center font-semibold mb-2">
            Add New Contact
          </h1>
          <form onSubmit={postContact}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Address"
              />
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add
            </button>
          </form>
        </div>
        {/* End of Form */}
      </div>
    </div>
  );
};
