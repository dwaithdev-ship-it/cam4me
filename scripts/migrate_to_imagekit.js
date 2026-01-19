
import ImageKit from 'imagekit';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// ImageKit Configuration - Replace placeholders with actual keys
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "YOUR_PRIVATE_KEY",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "YOUR_URL_ENDPOINT"
});

const scriptsDir = 'c:/Users/home/projects/cam4me/scripts';

async function uploadToImageKit(base64Data, fileName, folder) {
    if (!base64Data || !base64Data.startsWith('data:')) {
        return base64Data; // Already a URL or null
    }

    try {
        console.log(`Uploading ${fileName} to folder ${folder}...`);
        const response = await imagekit.upload({
            file: base64Data,
            fileName: fileName,
            folder: folder
        });
        console.log(`Successfully uploaded: ${response.url}`);
        return response.url;
    } catch (err) {
        console.error(`Failed to upload ${fileName}:`, err.message);
        return base64Data; // Keep original if upload fails
    }
}

async function migrateUsers() {
    const filePath = path.join(scriptsDir, 'users.json');
    if (!fs.existsSync(filePath)) return;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(`Migrating ${data.length} users...`);

    for (const user of data) {
        if (user.photo && user.photo.startsWith('data:')) {
            user.photo = await uploadToImageKit(user.photo, `user_${user.uid}`, 'users');
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Users migration complete.`);
}

async function migratePosts() {
    const filePath = path.join(scriptsDir, 'posts.json');
    if (!fs.existsSync(filePath)) return;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(`Migrating ${data.length} posts...`);

    for (const post of data) {
        if (post.postImage && post.postImage.startsWith('data:')) {
            post.postImage = await uploadToImageKit(post.postImage, `post_${post.id}`, 'posts');
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Posts migration complete.`);
}

async function migrateAds() {
    const filePath = path.join(scriptsDir, 'ads.json');
    if (!fs.existsSync(filePath)) return;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(`Migrating ${data.length} ads...`);

    for (const ad of data) {
        if (ad.image && ad.image.startsWith('data:')) {
            ad.image = await uploadToImageKit(ad.image, `ad_${ad.id}`, 'ads');
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Ads migration complete.`);
}

async function run() {
    if (imagekit.options.publicKey === "YOUR_PUBLIC_KEY") {
        console.error("ERROR: Please provide actual ImageKit keys in .env or at the top of this script.");
        process.exit(1);
    }

    try {
        await migrateUsers();
        await migratePosts();
        await migrateAds();
        console.log("Migration to ImageKit complete!");
    } catch (err) {
        console.error("Migration failed:", err);
    }
}

run();
