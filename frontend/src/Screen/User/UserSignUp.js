import RegistrationForm from "../../Components/RegistrationForm";

const UserSignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(198deg, rgba(34,86,195,1) 8%, rgba(45,253,233,1) 68%)",
      }}
    >
      <RegistrationForm
        array={["name", "email", "password", "phone", "dob", "address"]}
      />
    </div>
  );
};

export default UserSignUp;
