/**
 * Extract user role from user object, trying different possible field names
 * @param {Object} user - User object from API response
 * @returns {string} - User role or 'User' as default
 */
export const extractUserRole = (user) => {
  console.log('=== ROLE EXTRACTION DEBUG ===');
  console.log('User object received:', user);
  console.log('User object type:', typeof user);
  console.log('User object keys:', user ? Object.keys(user) : 'null');
  
  if (!user) {
    console.log('User is null/undefined, defaulting to User');
    return 'User';
  }
  
  // Try different possible role field names (put userRole first since that's what your API uses)
  const possibleRoleFields = [
    'userRole',    // Your API uses this field
    'UserRole',    // Most common in .NET APIs
    'role',        // Simple lowercase
    'Role',        // Uppercase first letter
    'type',        // Sometimes role is called type
    'Type',        // Uppercase type
    'userType',    // Alternative naming
    'UserType'     // Another alternative
  ];
  
  console.log('Checking fields:', possibleRoleFields);
  
  for (const field of possibleRoleFields) {
    console.log(`Checking field '${field}': value = '${user[field]}', type = '${typeof user[field]}'`);
    if (user[field] && typeof user[field] === 'string') {
      console.log(`✅ Role found in field '${field}':`, user[field]);
      return user[field];
    }
  }
  
  console.warn('❌ No role field found in user object:', user);
  console.warn('Available fields:', Object.keys(user));
  console.log('=== END ROLE EXTRACTION DEBUG ===');
  
  // Default fallback
  return 'User';
};

/**
 * Normalize role for consistent comparison
 * @param {string} role - Role string
 * @returns {string} - Normalized role
 */
export const normalizeRole = (role) => {
  if (!role || typeof role !== 'string') return 'User';
  
  const normalized = role.trim();
  
  // Handle common variations
  switch (normalized.toLowerCase()) {
    case 'admin':
    case 'administrator':
      return 'Admin';
    case 'user':
    case 'patient':
    case 'client':
      return 'User';
    default:
      return normalized;
  }
};
