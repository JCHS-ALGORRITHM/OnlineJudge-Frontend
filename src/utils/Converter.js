export default {
  getUserNameWithInfo: (user) => {
    let prefix = '';
    const name = user.realName || user.name;

    if (user.admin) {
      prefix = '관리자';
    } else {
      const grade = user.schoolGrade || user.grade;
      const clazz = String(user.schoolClass || user.class).padStart(2, '0');
      const id = String(user.schoolId || user.id).padStart(2, '0');

      prefix = grade + clazz + id;
    }

    return `[${prefix}] ${name}`;
  },
};
