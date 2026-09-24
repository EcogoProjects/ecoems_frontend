// Google puede devolver el nombre completo tanto en `name` como en `full_name`.
export function getProfileNames(metadata = {}) {
  const name = typeof metadata.name === 'string' ? metadata.name.trim() : '';
  const last_name = typeof metadata.last_name === 'string' ? metadata.last_name.trim() : '';
  const fullName = typeof metadata.full_name === 'string' ? metadata.full_name.trim() : '';

  if (!last_name && fullName) {
    const [firstName, ...surnames] = fullName.split(/\s+/);
    return { name: firstName, last_name: surnames.join(' ') };
  }

  return { name, last_name };
}
