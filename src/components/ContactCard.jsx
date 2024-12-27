import { HiOutlineUserCircle } from "react-icons/hi"
import { RiEditCircleLine } from "react-icons/ri"
import { IoMdTrash } from "react-icons/io"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"
import AddAndUpdateContact from "./AddAndUpdateContact"
import useDisclouse from '../hooks/useDisclouse'
import { toast } from "react-toastify"

const ContactCard = ({ contact }) => {
    const { isOpen, onClose, onOpen } = useDisclouse()

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id))
            onClose()
            toast.success("Contact Deleted Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div key={contact.id} className="flex justify-between bg-yellow items-center p-2 rounded-lg">
                {/* // Should enter border */}
                <div className="flex gap-1">
                    <HiOutlineUserCircle className="text-orange text-4xl" />
                    <div className="">
                        <h2 className="font-medium">{contact.name}</h2>
                        {/* Check the phone is same or not inside the firebase collection */}
                        <p className="text-sm">{contact.phone}</p>
                    </div>
                </div>
                <div className="flex text-3xl">
                    <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
                    <IoMdTrash onClick={() => deleteContact(contact.id)} className="text-orange cursor-pointer" />
                </div>
            </div>
            <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ContactCard
