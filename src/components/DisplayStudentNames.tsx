import { useState, useEffect } from "react";

interface StudentsByClass {
    [className: string]: string[];
}

const DisplayStudentNames = ()=>{
    const [studentsByClass, setStudentsByClass] = useState<StudentsByClass>({});
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [availableClasses, setAvailableClasses] = useState<string[]>([]);
    
    useEffect(()=>{
        const loadStudentNames = async () => {
            try {
                // Define static glob patterns for each class (Vite requires static strings)
                const globPatterns = {
                    'CSEG1': import.meta.glob('../../CSEG1/*', { query: '?raw', import: 'default' }),
                    'CSEG2': import.meta.glob('../../CSEG2/*', { query: '?raw', import: 'default' }),
                    'CSEAIML': import.meta.glob('../../CSEAIML/*', { query: '?raw', import: 'default' })
                };
                
                const allStudents: StudentsByClass = {};
                const classesWithStudents: string[] = [];
                
                for (const [className, modules] of Object.entries(globPatterns)) {
                    const names: string[] = [];
                    
                    // Load all the files and extract their content
                    for (const path in modules) {
                        const content = await modules[path]();
                        if (typeof content === 'string') {
                            // Trim whitespace and add to array if not empty
                            const trimmedContent = content.trim();
                            if (trimmedContent) {
                                names.push(trimmedContent);
                            }
                        }
                    }
                    
                    if (names.length > 0) {
                        allStudents[className] = names;
                        classesWithStudents.push(className);
                    }
                }
                
                setStudentsByClass(allStudents);
                setAvailableClasses(classesWithStudents);
                
                // Set the first available class as default
                if (classesWithStudents.length > 0) {
                    setSelectedClass(classesWithStudents[0]);
                }
            } catch (error) {
                console.error('Error loading student names:', error);
            }
        };
        
        loadStudentNames();
    }, [])

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClass(event.target.value);
    };

    return(
        <section className="student-commit-section">
            <h3>Add Your Name</h3>
            
            {availableClasses.length > 0 && (
                <div className="class-selector">
                    <label htmlFor="class-dropdown">Select Class: </label>
                    <select 
                        id="class-dropdown" 
                        value={selectedClass} 
                        onChange={handleClassChange}
                        style={{ marginBottom: '20px', padding: '5px' }}
                    >
                        {availableClasses.map((className) => (
                            <option key={className} value={className}>
                                {className}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            
            {selectedClass && studentsByClass[selectedClass] && (
                <div>
                    <h4>{selectedClass} Students:</h4>
                    <div className="student-names" id="student-names">
                        {studentsByClass[selectedClass].map((studentName, index)=>{
                            return <li key={index} className="student-names">{studentName}</li>
                        })}
                    </div>
                </div>
            )}
            
            {availableClasses.length === 0 && (
                <p>No student data found.</p>
            )}
        </section>
    )
}

export default DisplayStudentNames;