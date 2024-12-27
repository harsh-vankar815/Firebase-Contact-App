import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { db } from '../config/firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import * as Yup from 'yup' // Install this package

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    phone: Yup.string().required("Phone Number is Required"), // aur ham yaha par phone ka bhi check laga sakte hai string() ke baad
})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts")
            await addDoc(contactRef, contact)
            onClose()
            toast.success("Contact Added Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id)
            await updateDoc(contactRef, contact)
            onClose()
            toast.success("Contact Updated Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik validationSchema={contactSchemaValidation} type="submit" initialValues={isUpdate ? {
                    name: contact.name,
                    phone: contact.phone,
                } : {
                    name: "",
                    phone: "",
                }}
                    onSubmit={(values) => {
                        console.log(values)
                        isUpdate ? updateContact(values, contact.id) :
                            addContact(values)
                    }}>
                    <Form className='flex flex-col gap-4'>
                        <div className="flex flex-col gap-1">
                            <label className='font-medium' htmlFor="name">Name</label>
                            <Field name="name" className="border h-10 pl-2" />
                            <div className="text-red-500 text-xs">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className='font-medium' htmlFor="phone">Phone Number</label>
                            <Field name="phone" className="border h-10 pl-2" />
                            <div className="text-red-500 text-xs">
                                <ErrorMessage name="phone" />
                            </div>
                        </div>
                        <button className='bg-orange px-3 py-1.5 border self-end'>
                            {isUpdate ? "Update" : "Add"} Contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default AddAndUpdateContact
