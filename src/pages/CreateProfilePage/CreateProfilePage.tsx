import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../../components";
import Layout from "./Layout";

interface IFormInput {
  name: string;
  description: string;
  age: number;
  gender: string;
}

const CreateProfilePage = () => {
  const { handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Layout
      title="Create profile"
      actions={[
        <Link key="add-photo" to="/add-photo">
          <button>Continue</button>
        </Link>,
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Name" />
        <Input placeholder="About you" />

        <Input placeholder="Enter your age" type="number" />
        <Input placeholder="Gender" />
      </form>
    </Layout>
  );
};

export default CreateProfilePage;
