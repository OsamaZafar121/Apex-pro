import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { formatDate } from '../../utils/booking';
import { FaEnvelope, FaPhone, FaTrash, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import AdminPageHeader from '../../components/admin/AdminPageHeader';

function ContactMeta({ message }) {
  const sections = message.split('\n\n');

  return (
    <div className="space-y-2">
      {sections.map((section, index) => {
        const [label, ...rest] = section.split(':');
        const value = rest.join(':').trim();

        if (!value) {
          return (
            <p key={index} className="text-sm text-gray-700 whitespace-pre-line">
              {section}
            </p>
          );
        }

        const icon =
          label === 'Requested service' ? <FaBriefcase className="text-[#1169a9]" /> :
          label === 'Service address' ? <FaMapMarkerAlt className="text-[#F08A7F]" /> :
          null;

        return (
          <div key={index} className="text-sm text-gray-700">
            <p className="font-medium text-gray-900 flex items-center gap-2">
              {icon}
              {label}
            </p>
            <p className="mt-1 whitespace-pre-line">{value}</p>
          </div>
        );
      })}
    </div>
  );
}

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadContacts() {
      try {
        setIsLoading(true);
        setError('');
        const data = await api.getContacts();
        if (isMounted) {
          setContacts(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Failed to load contact requests.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadContacts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (contactId) => {
    if (!window.confirm('Delete this contact request?')) {
      return;
    }

    try {
      setDeletingId(contactId);
      await api.deleteContact(contactId);
      setContacts((current) => current.filter((contact) => contact.id !== contactId));
    } catch (deleteError) {
      setError(deleteError.message || 'Failed to delete contact request.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Inbox"
        title="Contacts"
        description="Review incoming quote requests and inquiries in the same dashboard visual system as the rest of the admin area."
        stats={[
          { label: 'Messages', value: contacts.length },
          { label: 'Loading', value: isLoading ? 'Yes' : 'No' },
        ]}
      />

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#1169a9] border-t-transparent"></div>
          <p className="text-gray-600">Loading contact requests...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">No contact requests yet</h3>
          <p className="mt-2 text-gray-600">New public inquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="rounded-2xl bg-white p-6 shadow-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Submitted {formatDate(contact.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-gray-700 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <span className="flex items-center gap-2">
                      <FaEnvelope className="text-[#1169a9]" />
                      {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center gap-2">
                        <FaPhone className="text-[#F08A7F]" />
                        {contact.phone}
                      </span>
                    )}
                  </div>

                  <ContactMeta message={contact.message} />
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(contact.id)}
                  disabled={deletingId === contact.id}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaTrash />
                  {deletingId === contact.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
