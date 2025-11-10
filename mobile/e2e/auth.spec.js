describe('Authentication E2E Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' },
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Login Flow', () => {
    it('should show login screen on launch', async () => {
      await expect(element(by.text('Welcome Back'))).toBeVisible();
      await expect(element(by.text('Sign in to continue'))).toBeVisible();
    });

    it('should display validation errors for empty fields', async () => {
      await element(by.label('Email')).tap();
      await element(by.label('Password')).tap();
      await element(by.label('Email')).tap(); // Trigger blur

      await expect(element(by.text('Email is required'))).toBeVisible();
      await expect(element(by.text('Password is required'))).toBeVisible();
    });

    it('should display error for invalid email', async () => {
      await element(by.label('Email')).typeText('invalid-email');
      await element(by.label('Password')).tap();

      await expect(element(by.text('Invalid email address'))).toBeVisible();
    });

    it('should navigate to register screen', async () => {
      await element(by.text('Sign Up')).tap();
      await expect(element(by.text('Create Account'))).toBeVisible();
    });

    it('should navigate to forgot password screen', async () => {
      await element(by.text('Forgot Password?')).tap();
      await expect(element(by.text('Forgot Password'))).toBeVisible();
    });

    it('should successfully login with valid credentials', async () => {
      await element(by.label('Email')).typeText('test@example.com');
      await element(by.label('Password')).typeText('Password123');
      await element(by.text('Login')).tap();

      // Wait for navigation to home screen
      await waitFor(element(by.text('Home')))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe('Registration Flow', () => {
    beforeEach(async () => {
      await element(by.text('Sign Up')).tap();
    });

    it('should show registration screen', async () => {
      await expect(element(by.text('Create Account'))).toBeVisible();
      await expect(element(by.text('Sign up to get started'))).toBeVisible();
    });

    it('should validate all required fields', async () => {
      await element(by.text('Sign Up')).tap();

      await expect(element(by.text('Name is required'))).toBeVisible();
      await expect(element(by.text('Email is required'))).toBeVisible();
      await expect(element(by.text('Password is required'))).toBeVisible();
    });

    it('should validate password match', async () => {
      await element(by.label('Full Name')).typeText('Test User');
      await element(by.label('Email')).typeText('test@example.com');
      await element(by.label('Password')).typeText('Password123');
      await element(by.label('Confirm Password')).typeText('DifferentPassword');
      await element(by.text('Sign Up')).tap();

      await expect(element(by.text('Passwords do not match'))).toBeVisible();
    });

    it('should navigate back to login screen', async () => {
      await element(by.text('Sign In')).tap();
      await expect(element(by.text('Welcome Back'))).toBeVisible();
    });
  });

  describe('Forgot Password Flow', () => {
    beforeEach(async () => {
      await element(by.text('Forgot Password?')).tap();
    });

    it('should show forgot password screen', async () => {
      await expect(element(by.text('Forgot Password'))).toBeVisible();
    });

    it('should validate email field', async () => {
      await element(by.text('Send Reset Link')).tap();
      await expect(element(by.text('Email is required'))).toBeVisible();
    });

    it('should navigate back to login', async () => {
      await element(by.text('Back to Login')).tap();
      await expect(element(by.text('Welcome Back'))).toBeVisible();
    });
  });
});
