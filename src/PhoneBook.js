import React, { useState, useEffect } from "react";

const PhoneBook = () => {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    emails: [""],
    phoneNumbers: [""],
    edit: "",
    delete: "",
  });

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAddEmail = () => {
    const updatedEmails = [...formData.emails, ""];
    setFormData({ ...formData, emails: updatedEmails });
  };

  const handleAddPhoneNumber = () => {
    const updatedPhoneNumbers = [...formData.phoneNumbers, ""];
    setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...formData.emails];
    updatedEmails[index] = value;
    setFormData({ ...formData, emails: updatedEmails });
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedPhoneNumbers = [...formData.phoneNumbers];
    updatedPhoneNumbers[index] = value;
    setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
  };

  const handleAddContact = () => {
    const newContact = {
      name: formData.name,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      emails: formData.emails,
      phoneNumbers: formData.phoneNumbers,
    };

    const updatedContacts = [...contacts, newContact];
    setContacts([...contacts, newContact]);
    setFormData({
      name: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      emails: [""],
      phoneNumbers: [""],
    });
    setShowForm(false);
    // Data will be stored in Local Storage
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const handleEditContact = (index) => {
    const selectedContact = contacts[index];
    setFormData({
      name: selectedContact.name,
      lastName: selectedContact.lastName,
      address: selectedContact.address,
      city: selectedContact.city,
      country: selectedContact.country,
      emails: selectedContact.emails,
      phoneNumbers: selectedContact.phoneNumbers,
    });
    setShowForm(true);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);

    // This will remove the contact from Local Storage
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      parsedContacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(parsedContacts));
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 mb-3">
          <h3>{showForm ? "Register new contact" : "Contacts"}</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end mb-5">
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Form" : "Add Contact"}
          </button>
        </div>
      </div>
      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                placeholder="Enter the Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                placeholder="Enter Last Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                placeholder="Enter Address"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                placeholder="Enter city"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={formData.country}
                placeholder="Enter country"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              {formData.emails.map((email, index) => (
                <div key={index}>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(event) =>
                      handleEmailChange(index, event.target.value)
                    }
                    placeholder="Enter the Email"
                  />
                </div>
              ))}
              <button className="btn btn-primary mt-2" onClick={handleAddEmail}>
                Add
              </button>
            </div>
            <div className="form-group">
              <label>Number:</label>
              {formData.phoneNumbers.map((number, index) => (
                <div key={index}>
                  <input
                    type="number"
                    className="form-control"
                    value={number}
                    onChange={(event) =>
                      handlePhoneNumberChange(index, event.target.value)
                    }
                    placeholder="Enter the Number"
                  />
                </div>
              ))}
              <button
                className="btn btn-primary btn-m"
                onClick={handleAddPhoneNumber}
              >
                Add
              </button>
            </div>
            <div className="d-flex justify-content">
              <button
                className="btn btn-primary btn-m"
                onClick={handleAddContact}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Email</th>
              <th>Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.lastName}</td>
                <td>{contact.address}</td>
                <td>{contact.city}</td>
                <td>{contact.country}</td>
                <td>{contact.emails.join(", ")}</td>
                <td>{contact.phoneNumbers.join(", ")}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleEditContact(index)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteContact(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhoneBook;
