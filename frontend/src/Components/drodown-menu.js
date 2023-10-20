import "../CSS/drop-down-menu.css";

const menuoptions = ["admin", "user", "others"];

function DropdownMenu() {
  return (
    <section>
      <div className="drop-down-menu">
        Menu
        <ul>
          {menuoptions.map((item) => {
            <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

export default DropdownMenu;
