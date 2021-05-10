import React, { useState, useEffect, useCallback } from "react";
import List from "./List";
import Alert from "./Alert";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, alert: "", msg: "" });
  const [isEdited, setIsEdited] = useState(false);
  const [editId, setEditId] = useState(null);
  console.log('test')
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "you have to enter a name");
    } else if (name && isEdited) {
      Axios.put("http://localhost:3001/update", {
        name: name,
        id: editId,
      }).then((response) => {
        setList(
          list.map((item) => {
            if (item.id === editId) {
              return { ...item, name: name };
            }
            return item;
          })
        );
      });
      setName("");
      setIsEdited(false);
      setEditId(null);
      showAlert(true, "success", "item successfully edited");
    } else {
      Axios.post("http://localhost:3001/create", {
        //body
        name: name,
      }).then(() => console.log("success"));
      setName("");
      showAlert(true, "success", "Item added successfully");
    }
  };

  const showAlert = (show = false, alert = "", msg = "") => {
    setAlert({ show, alert, msg });
  };

  const clearItems = () => {
    showAlert(true, "success", "items deleted");
    Axios.delete("http://localhost:3001/delete").then((response) => {
      setList([]);
    });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item deleted");
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setList(list.filter((item) => item.id !== id));
    });
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.name);
    setIsEdited(true);
    setEditId(id);
  };

  const getItems = useCallback(() => {
    Axios.get("http://localhost:3001/grocery").then((response) => {
      setList(response.data);
    });
  }, []);

  useEffect(() => {
    getItems();
  }, [name, getItems]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} />}
        <h3>Grocery list</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className="submit-btn" type="submit">
            {isEdited ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
