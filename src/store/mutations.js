export const mutations = {
  SET_USERS: (state, users) => {
    const filteredContacts = [];
    const status = ["Info", "Pending", "Canceled", "Delivered", "Danger"];

    for (const user of users) {
      const random = Math.floor(Math.random() * status.length);
      filteredContacts.push({
        id: user.id,
        customer: user.name,
        phone: user.phone,
        website: user.website,
        company: user.company.name,
        status: status[random],
      });
    }
    state.contacts = filteredContacts;
  },
  UPDATE_USER: (state, customer) => {
    const index = state.contacts.findIndex((user) => user.id === customer.id);
    state.contacts[index] = customer;
  },
  ADD_USER: (state, customer) => {
    customer.id = state.contacts.length + 1;
    state.contacts.push(customer);
  },
  REMOVE_USER: (state, id) => {
    const index = state.contacts.findIndex((user) => user.id === id);
    state.contacts.splice(index, 1);
  },
};
