import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();

function generateSlug(title:string):string {
    return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters
    
}

async function main() {
    // 🟢 Step 1: Create users and get their IDs

    const defaultPassword = await hash("12345678");
    const createdUsers = await prisma.user.createMany({
        data: Array.from({ length: 10 }).map(() => ({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            bio: faker.lorem.sentence(),
            avatar: faker.image.avatar(),
            password: defaultPassword,
        })),
        skipDuplicates: true,
    });

    const users = await prisma.user.findMany(); // Get real users from DB
    if (users.length === 0) throw new Error("No users found!");

    // 🟢 Step 2: Create posts with valid `authorId`
    const posts = await Promise.all(
        Array.from({ length: 200 }).map(() =>
            prisma.post.create({
                data: {
                    title: faker.lorem.sentence(),
                    slug: generateSlug(faker.lorem.sentence()),
                    content: faker.lorem.paragraphs(3),
                    thumbnail: faker.image.urlLoremFlickr({ height: 240, width: 320,}) + `?random=${faker.string.uuid()}`,
                    authorId: users[Math.floor(Math.random() * users.length)].id, // ✅ Use actual user ID
                    published: true,
                    comments: {
                        createMany: {
                            data: Array.from({ length: 10 }).map(() => ({
                                content: faker.lorem.sentence(),
                                authorId: users[Math.floor(Math.random() * users.length)].id, // ✅ Use valid user ID
                            })),
                        },
                    },
                },
            })
        )
    );

    console.log("✅ Seed complete!");
}

main().then(() => {
    prisma.$disconnect();
    process.exit(0);
}).catch((e) => {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
});