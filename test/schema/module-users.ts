const email: string = 'admin@admin.org';
const password: string = 'admin12345';
const name: string = 'Adminku Ada Loh';
const update_email: string = 'admin@admincoba.org';
const update_name: string = 'Admin Diubah Wkkwkw';

export const usersSchema = () => ({
  createData: `name=${name}&email=${email}&password=${password}`,
  updateData: `fullname=${update_name}&mail=${update_email}`,
});
