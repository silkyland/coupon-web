import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState({
    name: "",
    age: 0
  });
  const [state, setState] = useState({
    isOpen: false
  });

  useEffect(() => {
    const fetchUser = async () => {
      const users = await axios.get("http://localhost:3001/users");
      setUsers(users.data);
    };
    fetchUser();
  });

  // toggle

  const toggleForm = () => {
    setState({ isOpen: !state.isOpen });
  };

  return (
    <div>
      {state.isOpen ? (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const user = await axios.post("http://localhost:3001/add", {
              name: input.name,
              age: input.age
            });
            console.log(user.data);
          }}
        >
          <fieldset>
            <label>ชื่อสกุล : </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={e => {
                setInput({ ...input, name: e.target.value });
              }}
            />
          </fieldset>
          <fieldset>
            <label> อายุ : </label>
            <input
              type="number"
              name="age"
              value={input.age}
              onChange={e => {
                setInput({ ...input, age: e.target.value });
              }}
            />
          </fieldset>
          <button type="submit">บันทึก</button>
        </form>
      ) : null}

      <button onClick={() => toggleForm()}>เพิ่ม</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อสกุล</th>
            <th>อายุ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <a href="/edit">แก้ไข</a> |
                <button
                  onClick={async () => {
                    const user = await axios.delete("/" + user.id);
                  }}
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
