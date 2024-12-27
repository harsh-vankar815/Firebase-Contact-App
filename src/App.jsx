import { AiFillPlusCircle } from "react-icons/ai"
import Navbar from "./components/Navbar"
import { FiSearch } from "react-icons/fi"
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./config/firebase"
import ContactCard from "./components/ContactCard"
import AddAndUpdateContact from "./components/AddAndUpdateContact"
import useDisclouse from "./hooks/useDisclouse"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import NotFoundContact from "./components/NotFoundContact"


function App() {
  const [contacts, setContacts] = useState([])
  const { isOpen, onOpen, onClose } = useDisclouse()


  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts")

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          console.log(contactLists)
          setContacts(contactLists)

          return contactLists
        })

      } catch (error) {
        console.log(error)
      }
    }
    getContacts()
  }, [])

  const filterContacts = (e) => {
    const value = e.target.value

    const contactsRef = collection(db, "contacts")

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      console.log(contactLists)

      const filteredContacts = contactLists.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()))

      setContacts(filteredContacts)
      return filteredContacts
    })
  }

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-white ml-1 text-3xl absolute" />
            <input onChange={filterContacts} type="text" className="flex-grow bg-transparent border border-white rounded-md h-10 text-white pl-9" />
          </div>
          <AiFillPlusCircle onClick={onOpen} className="invert cursor-pointer text-5xl" />
        </div>
        {/* I need internet for this work */}
        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? <NotFoundContact /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App