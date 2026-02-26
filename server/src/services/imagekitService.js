import { imagekit } from '../config/imagekit.js';

export class ImageKitService {
    /**
     * Upload image to ImageKit
     * @param {string} file - Base64 encoded file or buffer
     * @param {string} fileName - Name of the file
     * @param {string} folder - Folder path (default: 'posts')
     * @returns {Promise<string>} - URL of uploaded image
     */
    async uploadImage(file, fileName, folder = 'posts') {
        try {
            const result = await imagekit.upload({
                file,  // base64 string or buffer
                fileName,
                folder: `/${folder}`,
                useUniqueFileName: true
            });
            return result.url;
        } catch (error) {
            console.error('ImageKit upload error:', error);
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }

    /**
     * Upload video to ImageKit
     * @param {string} file - Base64 encoded file or buffer
     * @param {string} fileName - Name of the file
     * @param {string} folder - Folder path (default: 'posts')
     * @returns {Promise<string>} - URL of uploaded video
     */
    async uploadVideo(file, fileName, folder = 'posts') {
        try {
            const result = await imagekit.upload({
                file,
                fileName,
                folder: `/${folder}`,
                useUniqueFileName: true,
                tags: ['video']
            });
            return result.url;
        } catch (error) {
            console.error('ImageKit video upload error:', error);
            throw new Error(`Failed to upload video: ${error.message}`);
        }
    }

    /**
     * Delete file from ImageKit
     * @param {string} fileId - ImageKit file ID
     * @returns {Promise<boolean>}
     */
    async deleteFile(fileId) {
        try {
            await imagekit.deleteFile(fileId);
            return true;
        } catch (error) {
            console.error('ImageKit delete error:', error);
            return false;
        }
    }

    /**
     * Get authentication parameters for client-side upload
     * @returns {Object} - Authentication parameters
     */
    getAuthenticationParameters() {
        return imagekit.getAuthenticationParameters();
    }

    /**
     * Upload multiple images
     * @param {Array} files - Array of base64 encoded files
     * @param {string} folder - Folder path
     * @returns {Promise<Array<string>>} - Array of URLs
     */
    async uploadMultipleImages(files, folder = 'posts') {
        const uploadPromises = files.map((file, index) =>
            this.uploadImage(file, `image_${Date.now()}_${index}.jpg`, folder)
        );
        return Promise.all(uploadPromises);
    }

    /**
     * Upload multiple videos
     * @param {Array} files - Array of base64 encoded files
     * @param {string} folder - Folder path
     * @returns {Promise<Array<string>>} - Array of URLs
     */
    async uploadMultipleVideos(files, folder = 'posts') {
        const uploadPromises = files.map((file, index) =>
            this.uploadVideo(file, `video_${Date.now()}_${index}.mp4`, folder)
        );
        return Promise.all(uploadPromises);
    }
}

export const imagekitService = new ImageKitService();
