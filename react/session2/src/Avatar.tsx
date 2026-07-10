interface AvatarProps {
  name: string;
}

/*
Single Responsibility:
This component is responsible only for displaying
the user's avatar image.
*/

function Avatar({ name }: AvatarProps) {
  return (
    <img
      src={`https://i.pravatar.cc/50?u=${name}`}
      alt={name}
      style={{
        borderRadius: "50%",
        width: 50,
        height: 50,
      }}
    />
  );
}

export default Avatar;