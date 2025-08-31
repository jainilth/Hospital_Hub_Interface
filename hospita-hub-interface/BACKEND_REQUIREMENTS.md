# Backend API Requirements for Doctor Edit Functionality

## Current Status
The frontend doctor edit functionality is fully implemented but fails when updating doctors due to backend API issues.

## Missing/Broken API Endpoint

### UpdateDoctor Endpoint
- **Expected URL**: `PUT /api/Doctor/UpdateDoctor/{id}`
- **Current Status**: Returns 400 Bad Request
- **Content-Type**: `multipart/form-data`

### Request Format
The frontend sends a FormData object with the following fields:

```
DoctorName: string
ConsultationFee: number
DoctorEmail: string
DoctorContectNo: string
DoctorGender: string
SpecializationId: number
DepartmentId: number
HospitalId: number
DoctorExperienceYears: number
Rating: number (optional)
UserId: number
ProfilePhoto: File (optional)
Qualification: string
AvailabilityStatus: string ("Available", "Busy", "On Leave")
StartWorkTime: string (HH:mm format)
EndWorkTime: string (HH:mm format)
TotalPatient: number (optional)
DoctorAddress: string
DoctorCityId: number
DoctorStateId: number
DoctorCountryId: number
languages: string (optional)
nextAvailable: string (datetime-local format, optional)
```

### Expected Response Format
```json
{
  "success": true,
  "message": "Doctor updated successfully",
  "data": {
    // Updated doctor object
  }
}
```

## Working API Endpoints
These endpoints are confirmed to work correctly:

1. **GetDoctorById**: `GET /api/Doctor/GetDoctorById/{id}` ✅
2. **GetAllSpecializations**: `GET /api/Specialization/GetAllSpecializations` ✅
3. **GetAllDepartment**: `GET /api/Department/GetAllDepartment` ✅
4. **GetAllHospitals**: `GET /api/Hospital/GetAllHospitals` ✅
5. **GetAllUsers**: `GET /api/User/GetAllUsers` ✅
6. **GetAllCountries**: `GET /api/Country/GetAllCountries` ✅
7. **GetStatesByCountry**: `GET /api/State/GetStatesByCountry/GetStatesByCountry/{countryId}` ✅
8. **GetCitiesByState**: `GET /api/City/GetCitiesByState/GetCitiesByState/{stateId}` ✅

## Frontend Error Handling
The frontend now includes comprehensive error handling:
- 400 Bad Request: Shows specific error message from backend
- 404 Not Found: Indicates missing API endpoint
- 500 Server Error: Suggests checking backend logs
- Network errors: Generic error message
- Console logging for debugging

## Next Steps for Backend Developer
1. Implement or fix the `UpdateDoctor` API endpoint in the Doctor controller
2. Ensure it accepts `multipart/form-data` for file uploads
3. Handle all the form fields listed above
4. Return appropriate HTTP status codes and error messages
5. Test the endpoint with the exact data format sent by the frontend

## Testing the Frontend
The frontend edit functionality can be tested by:
1. Navigating to `/admin/doctorList`
2. Clicking the "Edit" button on any doctor row
3. Modifying fields and attempting to save
4. Check browser console for detailed error information

The edit form loads doctor data correctly and displays all fields properly. The only issue is the backend update API.
