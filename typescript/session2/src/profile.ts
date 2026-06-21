interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}

function renderProfile(profile: Profile): string {
  const bio = profile.bio ?? "No bio provided";

  let result = `Name: ${profile.displayName}\nBio: ${bio}`;

  if (profile.website) {
    result += `\nWebsite: ${profile.website}`;
  }

  return result;
}

const profile1: Profile = {
  displayName: "Kawin",
  bio: "Frontend Developer",
  website: "https://example.com",
  avatarUrl: "avatar.jpg"
};

const profile2: Profile = {
  displayName: "John"
};

console.log(renderProfile(profile1));
console.log(renderProfile(profile2));

/*
profile.bio may be undefined.

Trying:

profile.bio.toUpperCase()

causes:
Object is possibly 'undefined'

because bio is optional.
*/