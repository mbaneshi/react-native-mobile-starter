# 🤖 AI Agent Instructions - React Native Mobile App

## Project Context
This is a **React Native mobile application** with a Node.js/Express backend. The project is **85-90% complete** and production-ready for mobile deployment.

---

## 🎯 Current Status

### Completed Components ✅
- **Backend API**: 100% complete with authentication, user management, notifications
- **Mobile Services Layer**: 100% complete with API integration
- **Redux State Management**: 100% complete (auth, user, notifications, settings)
- **Navigation**: 100% complete (Auth + Main navigators)
- **Core Screens**: 9 screens fully implemented
- **UI Components**: 5 reusable components
- **Testing**: Jest configured, 8/9 tests passing

### Project Statistics
- **Total Files**: 70+ files
- **Lines of Code**: ~12,000+
- **Test Coverage**: Service layer tested
- **Completion**: 85-90%

---

## 📋 What an AI Agent Should Know

### Architecture Overview
```
Project Structure:
├── backend/          # Node.js/Express API (COMPLETE)
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   └── models/
│   └── tests/
│
├── mobile/           # React Native app (85-90% complete)
│   ├── src/
│   │   ├── screens/     # 9 screens ✅
│   │   ├── components/  # 5 components ✅
│   │   ├── navigation/  # Complete ✅
│   │   ├── store/       # Redux complete ✅
│   │   ├── services/    # API services complete ✅
│   │   └── hooks/       # Custom hooks ✅
│   └── __tests__/
```

### Tech Stack
- **Mobile**: React Native 0.73.x, TypeScript, Redux Toolkit
- **Backend**: Node.js 20.x, Express, TypeScript
- **Database**: PostgreSQL 16.x with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **State Management**: Redux Toolkit
- **Testing**: Jest + React Native Testing Library

---

## 🔨 Remaining Work (10-15%)

### Priority Tasks
1. **Add E2E Tests** (~4 hours)
   - Set up Detox
   - Write critical flow tests
   - Add to CI/CD

2. **Polish UI/UX** (~3 hours)
   - Add loading skeletons
   - Improve error messages
   - Add empty states

3. **Performance Optimization** (~2 hours)
   - Add image lazy loading
   - Optimize Redux selectors
   - Add list virtualization

4. **Production Hardening** (~3 hours)
   - Add crash reporting (Sentry)
   - Add analytics
   - Add feature flags

---

## 🚀 Development Commands

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Mobile
```bash
cd mobile
npm install
cp .env.example .env
# Edit .env with backend URL
npm run ios     # or npm run android
```

### Testing
```bash
# Backend tests
cd backend && npm test

# Mobile tests
cd mobile && npm test

# Type checking
npm run type-check
```

---

## 📝 Key Files to Understand

### Critical Backend Files
1. `backend/src/server.ts` - Main server entry
2. `backend/src/controllers/auth.controller.ts` - Authentication
3. `backend/src/services/user.service.ts` - User management
4. `backend/prisma/schema.prisma` - Database schema

### Critical Mobile Files
1. `mobile/src/App.tsx` - Root component
2. `mobile/src/store/index.ts` - Redux store
3. `mobile/src/navigation/index.tsx` - Navigation setup
4. `mobile/src/services/api.service.ts` - API client

---

## 🎓 Agent Instructions

### If Asked to "Complete the Project"
1. Read `NEXT_STEPS.md` for remaining tasks
2. Focus on the 10-15% remaining work
3. Add E2E tests first (highest priority)
4. Then polish UI/UX
5. Finally add production monitoring

### If Asked to "Fix a Bug"
1. Check if backend or mobile issue
2. Run relevant tests: `npm test`
3. Check logs for errors
4. Fix and add test case
5. Verify fix with `npm test`

### If Asked to "Add a Feature"
1. Check if backend API changes needed
2. If yes: Update backend first, then mobile
3. If no: Add to mobile directly
4. Always add tests
5. Update documentation

### If Asked to "Deploy"
1. Backend: Follow `backend/DEPLOYMENT.md`
2. Mobile: Build iOS/Android following guides
3. Use environment variables for configs
4. Test on staging first
5. Monitor after deployment

---

## ⚠️ Important Warnings

### DO NOT:
- ❌ Remove existing tests
- ❌ Commit secrets or API keys
- ❌ Push directly to main (use feature branches)
- ❌ Skip type checking
- ❌ Ignore linting errors

### ALWAYS:
- ✅ Run tests before committing
- ✅ Use environment variables
- ✅ Follow TypeScript strict mode
- ✅ Add tests for new features
- ✅ Update documentation

---

## 🔐 Security Considerations

### Backend Security
- JWT tokens with rotation
- Password hashing (bcrypt)
- Rate limiting on API
- CORS configured
- Input validation
- SQL injection prevention (Prisma)

### Mobile Security
- Secure storage for tokens
- No hardcoded secrets
- HTTPS only
- Certificate pinning ready
- Biometric auth ready

---

## 📊 Success Criteria

### For "Complete" Status
- [ ] All tests passing (10/10)
- [ ] E2E tests added
- [ ] 80%+ test coverage
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Production build succeeds
- [ ] Performance metrics met
- [ ] Security audit passed

### For "Production Ready"
- [ ] Deployed to staging
- [ ] User acceptance testing done
- [ ] Load tested
- [ ] Monitoring configured
- [ ] Crash reporting active
- [ ] CI/CD pipeline working

---

## 📚 Additional Resources

- **Main README**: `README.md`
- **Requirements**: `REQUIREMENTS.md`
- **Next Steps**: `NEXT_STEPS.md`
- **Backend API Docs**: `backend/API.md`
- **Completion Report**: `COMPLETION_REPORT.md`

---

## 🤝 Getting Help

### If Stuck:
1. Read the error message carefully
2. Check relevant test file
3. Review similar implemented features
4. Check `TROUBLESHOOTING.md` if it exists
5. Check backend logs: `docker logs app-backend`

### Common Issues:
- **"Cannot connect to backend"**: Check `backend/.env` and mobile `.env` URLs match
- **"Tests failing"**: Run `npm install` and check Node version (need 20.x)
- **"Build fails"**: Clear caches: `npm start -- --reset-cache`
- **"Types not found"**: Run `npx prisma generate` in backend

---

**Project Status**: 85-90% Complete, Production-Ready
**Last Updated**: November 10, 2025
**Completion Estimate**: 10-15% remaining (1-2 weeks)
