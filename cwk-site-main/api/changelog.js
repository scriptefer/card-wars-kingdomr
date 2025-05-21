const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Helper function to read changelog data
function readChangelogData() {
    const changelogPath = path.join(__dirname, '../public/data/changelog.json');
    if (fs.existsSync(changelogPath)) {
        return JSON.parse(fs.readFileSync(changelogPath));
    }
    return [];
}

// Helper function to write changelog data
function writeChangelogData(data) {
    const changelogPath = path.join(__dirname, '../public/data/changelog.json');
    fs.writeFileSync(changelogPath, JSON.stringify(data, null, 2));
}

// Get all changelog entries
router.get('/admin/changelog', (req, res) => {
    try {
        const changelogData = readChangelogData();
        res.json(changelogData);
    } catch (error) {
        console.error('Error reading changelog:', error);
        res.status(500).json({ error: 'Failed to read changelog', details: error.message });
    }
});

// Get a specific changelog entry
router.get('/admin/changelog/:version', (req, res) => {
    try {
        const changelogData = readChangelogData();
        const entry = changelogData.find(entry => entry.version === req.params.version);
        
        if (!entry) {
            return res.status(404).json({ error: 'Changelog entry not found' });
        }
        
        res.json(entry);
    } catch (error) {
        console.error('Error reading changelog entry:', error);
        res.status(500).json({ error: 'Failed to read changelog entry', details: error.message });
    }
});

// Create a new changelog entry
router.post('/admin/changelog', (req, res) => {
    try {
        const { version, changes, badges } = req.body;
        
        if (!version || !changes) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: { version: !version, changes: !changes }
            });
        }
        
        const changelogData = readChangelogData();
        
        // Check if version already exists
        if (changelogData.some(entry => entry.version === version)) {
            return res.status(400).json({ error: 'Version already exists' });
        }
        
        const newEntry = {
            version,
            date: new Date().toISOString(),
            changes: changes.split('\n').filter(change => change.trim()),
            badges: badges ? badges.split(',').map(badge => badge.trim()).filter(badge => badge) : []
        };
        
        changelogData.unshift(newEntry);
        writeChangelogData(changelogData);
        
        res.json(newEntry);
    } catch (error) {
        console.error('Error creating changelog entry:', error);
        res.status(500).json({ error: 'Failed to create changelog entry', details: error.message });
    }
});

// Update a changelog entry
router.put('/admin/changelog/:version', (req, res) => {
    try {
        const { date, changes } = req.body;
        const version = req.params.version;
        
        if (!date || !changes || !Array.isArray(changes)) {
            return res.status(400).json({ 
                error: 'Missing required fields or invalid data format',
                details: { date: !date, changes: !changes || !Array.isArray(changes) }
            });
        }
        
        const changelogData = readChangelogData();
        const entryIndex = changelogData.findIndex(entry => entry.version === version);
        
        if (entryIndex === -1) {
            return res.status(404).json({ error: 'Changelog entry not found' });
        }
        
        // Filter out any empty change strings from the array
        const filteredChanges = changes.filter(change => change.trim());

        changelogData[entryIndex] = {
            ...changelogData[entryIndex],
            date: date,
            changes: filteredChanges,
        };
        
        writeChangelogData(changelogData);
        res.json(changelogData[entryIndex]);
    } catch (error) {
        console.error('Error updating changelog entry:', error);
        res.status(500).json({ error: 'Failed to update changelog entry', details: error.message });
    }
});

// Delete a changelog entry
router.delete('/admin/changelog/:version', (req, res) => {
    try {
        const version = req.params.version;
        const changelogData = readChangelogData();
        const entryIndex = changelogData.findIndex(entry => entry.version === version);
        
        if (entryIndex === -1) {
            return res.status(404).json({ error: 'Changelog entry not found' });
        }
        
        changelogData.splice(entryIndex, 1);
        writeChangelogData(changelogData);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting changelog entry:', error);
        res.status(500).json({ error: 'Failed to delete changelog entry', details: error.message });
    }
});

module.exports = router; 