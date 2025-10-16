type Props = {
  name: string;
};

export const Tag = ({ name }: Props) => (
  <span className="mb-4 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-sm text-teal-300">
    {name}
  </span>
);
