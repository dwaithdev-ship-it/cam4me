# Firebase Firestore Schema & Query Strategy

## 1. Users Collection (`users`)
**Purpose**: Stores user identity, profile, and app state.
**Normalization Strategy**: Keep core user profile here. Refer to this via `uid` in other collections.

### Schema
```json
// Collection: users
// Doc ID: {uid}
{
  "email": "user@example.com",
  "role": "user", // 'admin', 'ad_manager'
  "profileData": {
    "name": "John Doe",
    "photo": "https://..."
  },
  "formData": {
    "mobile": "9999999999",
    "district": "Guntur"
  },
  "createdAt": "2026-01-02T12:00:00Z"
}
```

### Queries

**Create/Update User (Upsert)**
```javascript
import { doc, setDoc } from "firebase/firestore"; 

await setDoc(doc(db, "users", user.uid), {
  email: user.email,
  profileData: { name: "John", photo: null },
  createdAt: new Date().toISOString()
}, { merge: true });
```

**Get Current User Profile**
```javascript
import { doc, getDoc } from "firebase/firestore";

const userSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
if (userSnap.exists()) {
  console.log("User Data:", userSnap.data());
}
```

---

## 2. Posts Collection (`posts`)
**Purpose**: Public feed content.
**Normalization Strategy**: 
- **Strict Normalization**: Store only `userId`. Usage requires client-side "join" (fetching user doc for every post).
- **Practical (Recommended)**: Store a *snapshot* of `userName` and `userPhoto` at the time of posting. This avoids N+1 reads (reading 10 posts -> reading 10 users).

### Schema
```json
// Collection: posts
// Doc ID: Auto-generated
{
  "userId": "{uid}",
  "message": "Hello World",
  "postImage": "https://...",
  "timestamp": "2026-01-02T12:05:00Z",
  "authorSnapshot": {
    "name": "John Doe",
    "photo": "https://..."
  },
  "likes": ["uid1", "uid2"] // Array of UIDs who liked
}
```

### Queries

**Fetch Main Feed**
```javascript
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const q = query(
  collection(db, "posts"),
  orderBy("timestamp", "desc"),
  limit(20)
);

const querySnapshot = await getDocs(q);
const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

**Create Post**
```javascript
import { collection, addDoc } from "firebase/firestore";

await addDoc(collection(db, "posts"), {
  userId: auth.currentUser.uid,
  message: "My new post",
  timestamp: new Date().toISOString(),
  authorSnapshot: {
    name: profileData.name,
    photo: profileData.photo
  }
});
```

---

## 3. Ads Collection (`ads`)
**Purpose**: Managed campaigns.
**Normalization Strategy**: Separate from users. content is self-contained.

### Schema
```json
// Collection: ads
// Doc ID: Auto-generated
{
  "createdBy": "{manager_uid}",
  "image": "https://...",
  "link": "https://example.com",
  "startDate": "2026-01-01T00:00:00Z",
  "endDate": "2026-01-10T00:00:00Z",
  "active": true
}
```

### Queries

**Fetch Active Ads**
*Requires a Composite Index on `active` and `endDate`.*

```javascript
import { collection, query, where, getDocs } from "firebase/firestore";

const now = new Date().toISOString();
const q = query(
  collection(db, "ads"),
  where("active", "==", true),
  where("endDate", ">", now)
);

const adsSnap = await getDocs(q);
const ads = adsSnap.docs.map(doc => doc.data());
```

---

## 4. Moderation / System (`system`)
**Purpose**: Global lists like blocked users.
**Normalization Strategy**: Single document for global arrays (be careful of 1MB limit) or sub-collection for scalability.

### Schema
```json
// Collection: system
// Doc ID: moderation
{
  "blockedUsers": ["uid1", "uid2", "uid3"]
}
```

### Queries

**Check if User is Banned**
```javascript
import { doc, getDoc } from "firebase/firestore";

const modSnap = await getDoc(doc(db, "system", "moderation"));
if (modSnap.exists()) {
  const blocked = modSnap.data().blockedUsers || [];
  if (blocked.includes(tempUser.uid)) {
    throw new Error("Account Banned");
  }
}
```
