import React, { useState, useEffect } from 'react';
import { locationService } from '../services/locationService';

export default function AdminLocationManager() {
    const [activeTab, setActiveTab] = useState('state');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Data States
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [mandals, setMandals] = useState([]);

    // Selection States
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('');
    const [selectedMandal, setSelectedMandal] = useState('');

    // Input State
    const [newItemName, setNewItemName] = useState('');

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = async () => {
        try {
            const data = await locationService.getStates();
            setStates(data);
        } catch (err) { setError('Failed to load states'); }
    };

    const handleStateChange = async (e) => {
        const id = e.target.value;
        setSelectedState(id);
        setSelectedDistrict(''); setSelectedConstituency(''); setSelectedMandal('');
        setDistricts([]); setConstituencies([]); setMandals([]);
        if (id) {
            const data = await locationService.getDistricts(id);
            setDistricts(data);
        }
    };

    const handleDistrictChange = async (e) => {
        const id = e.target.value;
        setSelectedDistrict(id);
        setSelectedConstituency(''); setSelectedMandal('');
        setConstituencies([]); setMandals([]);
        if (id) {
            const data = await locationService.getConstituencies(id);
            setConstituencies(data);
        }
    };

    const handleConstituencyChange = async (e) => {
        const id = e.target.value;
        setSelectedConstituency(id);
        setSelectedMandal('');
        setMandals([]);
        if (id) {
            const data = await locationService.getMandals(id);
            setMandals(data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newItemName.trim()) return;

        setLoading(true);
        setMessage('');
        setError('');

        try {
            let payload = { type: activeTab, name: newItemName };

            if (activeTab !== 'state' && !selectedState) throw new Error('State required');
            if (['constituency', 'mandal', 'village'].includes(activeTab) && !selectedDistrict) throw new Error('District required');
            if (['mandal', 'village'].includes(activeTab) && !selectedConstituency) throw new Error('Constituency required');
            if (activeTab === 'village' && !selectedMandal) throw new Error('Mandal required');

            if (selectedState) payload.stateId = selectedState;
            if (selectedDistrict) payload.districtId = selectedDistrict;
            if (selectedConstituency) payload.constituencyId = selectedConstituency;
            if (selectedMandal) payload.mandalId = selectedMandal;

            await locationService.addLocation(payload);
            setMessage(`${activeTab} added successfully!`);
            setNewItemName('');

            // Refresh current level lists if needed
            if (activeTab === 'state') loadStates();
            else if (activeTab === 'district') handleStateChange({ target: { value: selectedState } });
            else if (activeTab === 'constituency') handleDistrictChange({ target: { value: selectedDistrict } });
            else if (activeTab === 'mandal') handleConstituencyChange({ target: { value: selectedConstituency } });

        } catch (err) {
            setError(err.message || 'Failed to add location');
        } finally {
            setLoading(false);
        }
    };

    const TabButton = ({ name, label }) => (
        <button
            onClick={() => { setActiveTab(name); setMessage(''); setError(''); }}
            style={{
                padding: '10px 20px',
                background: activeTab === name ? '#9C27B0' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                opacity: activeTab === name ? 1 : 0.7
            }}
        >
            {label}
        </button>
    );

    return (
        <div style={{ padding: '20px', color: '#333' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <TabButton name="state" label="Add State" />
                <TabButton name="district" label="Add District" />
                <TabButton name="constituency" label="Add Constituency" />
                <TabButton name="mandal" label="Add Mandal" />
                <TabButton name="village" label="Add Village" />
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ marginTop: 0, textTransform: 'capitalize' }}>Add New {activeTab}</h3>

                {message && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{message}</div>}
                {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {activeTab !== 'state' && (
                        <select value={selectedState} onChange={handleStateChange} style={{ padding: '10px', borderRadius: '5px' }}>
                            <option value="">Select State</option>
                            {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    )}

                    {['district', 'constituency', 'mandal', 'village'].includes(activeTab) && selectedState && (
                        <select value={selectedDistrict} onChange={handleDistrictChange} style={{ padding: '10px', borderRadius: '5px' }}>
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    )}

                    {['constituency', 'mandal', 'village'].includes(activeTab) && selectedDistrict && (
                        <select value={selectedConstituency} onChange={handleConstituencyChange} style={{ padding: '10px', borderRadius: '5px' }}>
                            <option value="">Select Constituency</option>
                            {constituencies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    )}

                    {['mandal', 'village'].includes(activeTab) && selectedConstituency && (
                        <select value={selectedMandal} onChange={(e) => setSelectedMandal(e.target.value)} style={{ padding: '10px', borderRadius: '5px' }}>
                            <option value="">Select Mandal</option>
                            {mandals.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    )}

                    <input
                        type="text"
                        placeholder={`Enter ${activeTab} Name`}
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '12px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {loading ? 'Adding...' : `Add ${activeTab}`}
                    </button>
                </form>
            </div>
        </div>
    );
}
